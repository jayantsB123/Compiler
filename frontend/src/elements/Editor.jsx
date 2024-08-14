import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Moon, Sun } from "lucide-react"
import axios from 'axios';
import { useTheme } from "@/components/theme-provider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useState } from 'react';

const FormSchema = z.object({
    editor: z
        .string()
        .min(10, {
            message: 'Editor must contain atleast 10 characters.',
        })
        .max(500, {
            message: 'Character count must be less than 160.',
        }),
});

export function TextareaForm() {
    const { setTheme } = useTheme();
    const form = useForm({
        resolver: zodResolver(FormSchema),
    });
    const [output, setOutput] = useState('');
    const onSubmit = async (data) => {
        try {
            const postData = {
                code: data.editor,
                timeout: 5000,  
                compilerFlags: "-std=c++11"  
            };

            console.log(postData);
            const response = await axios.post('http://localhost:5000/api/v1/run', postData);
            // console.log(response);
            setOutput(JSON.stringify(response.data, null, 2));
            
        } catch (error) {
            console.log(error);
            setOutput("Syntax error");
        }
    };

    return (
        <>
            <div className='flex mt-16 justify-end'>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className='flex  justify-between'>
                <div className='flex'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                            <FormField
                                control={form.control}
                                name="editor"
                                render={({ field }) => (
                                    <div className="flex flex-col space-y-2">
                                        <div className="flex flex-col">
                                            <FormLabel className="text-lg mb-2 text-left">Code-Editor</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Enter your code here"
                                                    className="resize-none w-[500px] h-[500px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                            </FormDescription>
                                            <FormMessage />
                                        </div>
                                    </div>
                                )}
                            />
                            <div className="flex justify-start">
                                <Button
                                    variant="outline"
                                    className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Form>


                </div>
                <div>
                    <Textarea
                        placeholder="output"
                        className="resize-none w-[500px] h-[500px] mt-9"
                        value={output}
                        readOnly
                    />
                </div>

            </div>
        </>
    );
}
