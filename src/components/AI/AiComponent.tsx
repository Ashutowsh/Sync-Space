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

function AiComponent({aiOutput} : {aiOutput : (output: string) => void}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();
  const [loading, setLoading] = useState(false);

  const generatetemplate = async() => {
    setLoading(true)
    const prompt = "Generate template for Editor.JS in JSON for : " + input
try {
      const result = await chatSession.sendMessage(prompt);
      console.log(result.response.text());
      aiOutput(JSON.parse(result.response.text()))
      setLoading(false);
      setOpen(false);
} catch (error) {
  console.log("Some Error Occured while generating AI template : ", error)
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
            <DialogDescription>
              <h2 className='mt-5'>Use the field below to input text, and the AI will generate a template for you.</h2>
              <Input placeholder='Enter the text' onChange={(e : any) => setInput(e.target.value)}/>
              <div className='mt-5 flex gap-5 justify-end'>
                <Button variant="outline"  disabled = {!input || loading} onClick={() => generatetemplate}>{loading?<Loader2Icon className='animate-spin'/> : "Generate"}</Button>
                <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AiComponent;
