'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '../ui/button';
import { LayoutGrid, Loader2Icon } from 'lucide-react';
import { Input } from '../ui/input';
import { chatSession } from '@/helper/AI';

function AiComponent({ aiOutput }: { aiOutput: (output: string) => void }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const generatetemplate = async () => {
    console.log(input)
    setLoading(true)
    const prompt = "Generate template for Editor.JS in JSON for : " + input
    console.log("Prompt : ", prompt);
    try {
      const result = await chatSession.sendMessage(prompt);
      const responseText = await result.response.text();
      console.log(responseText);
      aiOutput(JSON.parse(responseText))
      setLoading(false);
      setOpen(false);
    } catch (error) {
      console.log("Some Error Occurred while generating AI template: ", error)
      setLoading(false);
    }
  }

  return (
    <div>
      <Button variant="outline" className='flex gap-2' onClick={() => setOpen(true)}>
        <LayoutGrid /> Generate AI Summary
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate AI Template</DialogTitle>
            <DialogDescription asChild={true}>
              <div>
                <div className='mt-5'>Use the field below to input text, and the AI will generate a template for you.</div>
                <Input placeholder='Enter the text' onChange={(e: any) => setInput(e.target.value)} />
                <div className='mt-5 flex gap-5 justify-end'>
                  {/* <Button variant="outline" disabled={!input || loading} onClick={generatetemplate}>
                    {loading ? <Loader2Icon className='animate-spin' /> : "Generate"}
                  </Button> */}
                  <Button variant="outline" disabled={!input || loading}>
                    {loading ? <Loader2Icon className='animate-spin' /> : "Diabled (Pricing issue)"}
                  </Button>
                  <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AiComponent;
