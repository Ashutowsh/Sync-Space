import {create} from 'zustand';
import { ID, Models, Query } from 'node-appwrite';
import { databases } from '@/models/server/config';
import { db, documentCollection, documentOutputCollection } from '@/models/name';
import { toast } from 'sonner';

interface DocumentStoreState {
  documentList: Models.Document[];
  isLoading: boolean;
  getDocuments: (workspaceId: string) => Promise<void>;
  deleteDocument: (docId: string) => Promise<void>;
  renameDocument: (docId: string, newName: string) => Promise<void>;
  duplicateDocument: (doc: Models.Document, maxLimit : number) => Promise<void>;
  createDocument: (workspaceId: string, createdBy: string, maxLimit: number) => Promise<string | null | undefined>;
  updateDocumentInDatabase: (docId: string, updates: { title?: string; coverImage?: string; emoji?: string }) => Promise<void>;
}

export const useDocumentStore = create<DocumentStoreState>((set, get) => ({
  documentList: [],
  isLoading: false,
  getDocuments: async (workspaceId) => {
    set({ isLoading: true });
    try {
      const documents = await databases.listDocuments(db, documentCollection, [
        Query.orderDesc('$createdAt'),
        Query.equal('workSpaceId', workspaceId),
      ]);
      set({ documentList: documents.documents });
      console.log('Documents fetched:', documents.documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteDocument: async (docId) => {
    try {
      await databases.deleteDocument(db, documentCollection, docId);
      await databases.deleteDocument(db, documentOutputCollection, docId);
      toast('Your document deleted successfully.');
      set((state) => ({
        documentList: state.documentList.filter((doc) => doc.$id !== docId),
      }));
    } catch (error) {
      console.log('Error:', error);
      toast('Error in deleting the document.');
    }
  },

  renameDocument: async (docId, newName) => {
    try {
      await databases.updateDocument(db, documentCollection, docId, { title: newName });
      // toast('Document renamed successfully.');
      set((state) => ({
        documentList: state.documentList.map((doc) =>
          doc.$id === docId ? { ...doc, title: newName } : doc
        ),
      }));
    } catch (error) {
      console.log('Error:', error);
      toast('Error in renaming the document.');
    }
  },

  duplicateDocument: async (doc, maxLimit) => {
    const { documentList } = get();
    if (documentList.length >= maxLimit) {
        toast('Upgrade your plan.', {
          description: 'You have reached your free limits.',
          action: {
            label: 'Upgrade',
            onClick: () => console.log('Upgrade clicked'),
          },
        });
        return;
      }
    try {
      let copyCount = 1;
      let newTitle = `${doc.title} (${copyCount})`;

      while (documentList.some((d) => d.title === newTitle)) {
        copyCount++;
        newTitle = `${doc.title}(${copyCount})`;
      }

      const newDoc = await databases.createDocument(db, documentCollection, ID.unique(), {
        title: newTitle,
        createdBy: doc.createdBy,
        emoji: doc.emoji,
        workSpaceId: doc.workSpaceId,
      });

      const docOutput = await databases.getDocument(db, documentOutputCollection, doc.$id);

      console.log('Doc duplicated.');

      await databases.createDocument(db, documentOutputCollection, newDoc.$id, {
        documentId: newDoc.$id,
        output: docOutput.output,
      });

      console.log('Doc output duplicated.');
      toast('Document duplicated successfully.');
      set((state) => ({
        documentList: [...state.documentList, newDoc],
      }));
    } catch (error) {
      console.log('Error:', error);
      toast('Error in duplicating the document.');
    }
  },

  createDocument: async (workspaceId, createdBy, maxLimit) => {
    const { documentList } = get();

    if (documentList.length >= maxLimit) {
      toast('Upgrade your plan.', {
        description: 'You have reached your free limits.',
        action: {
          label: 'Upgrade',
          onClick: () => console.log('Upgrade clicked'),
        },
      });
      return ;
    }

    try {
      const newDoc = await databases.createDocument(db, documentCollection, ID.unique(), {
        createdBy,
        workSpaceId: workspaceId,
        title: 'Untitled Document',
        emoji: null,
      });

      console.log('Untitled Doc created.', newDoc);

      const response = await databases.createDocument(db, documentOutputCollection, newDoc.$id, {
        documentId: newDoc.$id,
        output: "",
      });

      console.log('Untitled Doc Output created.');
      set((state) => ({
        documentList: [newDoc, ...state.documentList],
      }));

      return response.$id;
    } catch (error) {
      console.error('Failed to create document:', error);
    }
  },

  updateDocumentInDatabase: async (docId, updates) => {
    try {
      await databases.updateDocument(db, documentCollection, docId, updates);
      set((state) => ({
        documentList: state.documentList.map((doc) =>
          doc.$id === docId ? { ...doc, ...updates } : doc
        ),
      }));
    } catch (error) {
      console.error('Error updating document in database:', error);
      toast('Error in updating the document.');
    }
  },

}));
