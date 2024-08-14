import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Moon, Sun } from "lucide-react";
import axios from 'axios';
import { useTheme } from "@/components/theme-provider";
import { Skeleton } from "@/components/ui/skeleton";
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
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

const FormSchema = z.object({
    editor: z
        .string()
        .min(10, {
            message: 'Editor must contain at least 10 characters.',
        })
        .max(500, {
            message: 'Character count must be less than 500.',
        }),
});

export function Arena() {
    const { setTheme } = useTheme();
    const form = useForm({
        resolver: zodResolver(FormSchema),
    });
    const [output, setOutput] = useState('');
    const [pass, setPass] = useState(0);
    const [total, setTotal] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const [showSkeleton, setShowSkeleton] = useState(false);
    const [testCases, setTestCases] = useState([]);

    const onSubmit = async (data) => {
        setShowSkeleton(true);
        try {
            const postData = {
                codeId: "reverse-string",
                code: data.editor,
                timeout: 5000,
                compilerFlags: "-std=c++11"
            };

            const response = await axios.post('http://localhost:5000/api/v1/test', postData);
            const results = response.data.testResults || [];

            setTestCases(results);
            setPass(results.filter(testCase => testCase.success).length);
            setTotal(results.length);
            setOutput(JSON.stringify(response.data, null, 2));
            setShowDetails(true);
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error!',
                description: 'Failed to submit data.',
            });
            setOutput("Syntax error");
        }
        setShowSkeleton(false);
    };

    return (
        <>
            <div className='flex mt-16  text-left'>
                <div>
                    <h1 className='font-bold text-3xl'>Reverse String</h1>
                    <h3 className='mt-4 w-full'>
                    In this problem, you are given a string 's' which consists of printable ASCII characters. Your goal is to reverse the characters of the given string and return the reversed string.

Reversing a string means that you need to rearrange the characters of the string such that the last character becomes the first, the second-to-last character becomes the second, and so on, until the first character becomes the last.
                    </h3>
                    <h3 className='mt-4'>
                        <h1 className='font-bold text-lg'>Example 1:</h1>
                        Input: s = "hello"
                        <h3>Output: "olleh"</h3>
                    </h3>
                    <h3 className='mt-4'>
                        <h1 className='font-bold text-xl'>Example 2:</h1>
                        Input: s = "world"
                        <h3>Output: "dlrow"</h3>
                        <h3 className='mt-4'>
                            <span className='font-bold text-xl'>Constraints:</span>
                            <ul className='list-disc pl-5 mt-2'>
                                <li>1 &le; s.length &le; 10<sup>5</sup></li>
                                <li>The string 's' consists only of printable ASCII characters.</li>
                            </ul>
                        </h3>
                    </h3>
                </div>
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
            <div className='flex mt-16'>
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
                {!showDetails && !showSkeleton && <div className='ml-56 mt-8  p-6 w-full font-bold'><h1>No output yet to display</h1></div>}
                {showSkeleton && <div className="ml-56 mt-8  p-6 w-full shadow-lg rounded-lg">
                    <div className="space-y-6">
                        <Skeleton className="h-8 w-[350px]" />
                        <Skeleton className="h-6 w-[250px]" />
                        <Skeleton className="h-6 w-[250px]" />
                        <Skeleton className="h-6 w-[250px]" />
                        <Skeleton className="h-6 w-[250px]" />
                        <Skeleton className="h-6 w-[250px]" />
                    </div>
                </div>}
                {showDetails && !showSkeleton && <div className='ml-56 mt-8  p-6 w-full shadow-lg rounded-lg'>
                    <h1 className='text-2xl font-semibold mb-4'>{pass}/{total} test cases passed</h1>
                    <div className='mt-4'>
                        <h2 className='text-xl font-bold mb-2'>Test Case Details:</h2>
                        {testCases.map((testCase,index) => (
                            <Accordion key={testCase.input} type="single" collapsible className='mb-4'>
                                <AccordionItem value={`item-${testCase.input}`}>
                                    <AccordionTrigger className={`p-4 rounded-lg ${testCase.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} transition-all duration-300 ease-in-out`}>
                                        <h3 className='text-lg font-semibold'>Test Case {index+1}</h3>
                                    </AccordionTrigger>
                                    <AccordionContent className='p-4 border border-gray-200 rounded-b-lg'>
                                        <div className='mb-2'>
                                            <span className='font-medium'>Input:</span> {testCase.input}
                                        </div>
                                        <div className='mb-2'>
                                            <span className='font-medium'>Actual Output:</span> {testCase.actual}
                                        </div>
                                        <div className='mb-2'>
                                            <span className='font-medium'>Expected Output:</span> {testCase.expected}
                                        </div>
                                        <div>
                                            <span className='font-medium'>Status:</span> {testCase.success ? 'Passed' : 'Failed'}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        ))}
                    </div>
                </div>}
            </div>
        </>
    );
}
