import EditorJS from "@editorjs/editorjs";
import React, { useRef, useEffect, useState } from "react";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Delimiter from '@editorjs/delimiter';
import Table from "editorjs-table";
import Checklist from '@editorjs/checklist';
import Warning from '@editorjs/warning';
import Alert from 'editorjs-alert';
import { databases } from "@/models/server/config";
import { db, documentOutputCollection } from "@/models/name";
import AiComponent from "../AI/AiComponent";

function DocumentEditor({ params }: { params: { id: string; docId: string } }) {
  const editorRef = useRef<EditorJS | null>(null);
  const [docOutput, setDocOutput] = useState<any>(null);

  // Fetch the document output from Appwrite
  const getDocument = async () => {
    try {
      const docId = params.docId;
      const document = await databases.getDocument(db, documentOutputCollection, docId);
      
      if (document?.output) {
        setDocOutput(JSON.parse(document.output));  // Parse and set the document output
      }
    } catch (error) {
      console.error("Failed to fetch document:", error);
    }
  };

  useEffect(() => {
    getDocument();
  }, [params]);

  useEffect(() => {
    if (typeof window !== "undefined" && !editorRef.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
          list: List,
          delimiter: Delimiter,
          table: Table,
          checklist: Checklist,
          warning: Warning,
          alert: {
            class: Alert,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+A',
            config: {
              alertTypes: [
                'primary', 'secondary', 'info', 'success', 'warning', 
                'danger', 'light', 'dark'
              ],
              defaultType: 'primary',
              messagePlaceholder: 'Enter something',
            },
          },
        },
        data: docOutput || {}, 
        onChange: async () => {
          try {
            const savedData = await editor.save();
            console.log("Saved data:", savedData);

            const docId = params.docId;
            
            await databases.updateDocument(db, documentOutputCollection, docId, {
              output: JSON.stringify(savedData),
            });
            console.log("Document Updated.");
          } catch (error) {
            console.error("Saving failed: ", error);
          }
        },
        onReady: () => {
          console.log("Editor.js is ready to work!");
        },
      });

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy?.();
        editorRef.current = null;
      }
    };
  }, [docOutput]);

  const handleAiOutput = async (output: any) => {
    if (editorRef.current) {
      editorRef.current.render(output);

      try {
        const savedData = await editorRef.current.save();
        const docId = params.docId;

        await databases.updateDocument(db, documentOutputCollection, docId, {
          output: JSON.stringify(savedData),
        });
        console.log("Document updated with AI output.");
      } catch (error) {
        console.error("Failed to update document with AI output:", error);
      }
    }
  };

  return (
    <div className="w-[70%]">
      <div id="editorjs"></div>
      <div className="fixed bottom-10 md:ml-80 left-0 z-10">
        <AiComponent aiOutput={handleAiOutput} />
      </div>
    </div>
  );
}

export default DocumentEditor;
