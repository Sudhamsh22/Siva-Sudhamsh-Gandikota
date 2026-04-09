'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { socialLinks } from '@/lib/data';
import { Github, Linkedin, Mail, MessageSquare, Send, Bot } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export function ContactSection() {
  const { toast } = useToast();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isHoveringBot, setIsHoveringBot] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    // Construct the Gmail compose URL
    const to = socialLinks.email;
    const subject = encodeURIComponent(`Connection Request from ${values.name}`);
    const body = encodeURIComponent(`${values.message}\n\n---\nSender Email: ${values.email}\nSender Name: ${values.name}`);
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
    
    // Open Gmail in a new tab
    window.open(gmailUrl, '_blank');

    toast({
      title: 'Transmission Success',
      description: "Data ingested. Redirecting to secure channel (Gmail).",
    });
    form.reset();
  }

  return (
    <section id="contact" ref={ref} className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
        >
            <h2 className="text-4xl md:text-5xl font-bold font-headline bg-gradient-to-r from-white to-primary/80 bg-clip-text text-transparent inline-block tracking-tight mb-4 filter drop-shadow-lg">
                Initiate Connection
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Ping the system to discuss opportunities, collaborations, or AI architecture.
            </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left AI Assistant Side */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col items-center lg:items-start text-center lg:text-left"
            >
                <div 
                    className="relative w-48 h-48 mb-8 cursor-pointer group"
                    onMouseEnter={() => setIsHoveringBot(true)}
                    onMouseLeave={() => setIsHoveringBot(false)}
                >
                    {/* Holographic glowing rings */}
                    <div className="absolute inset-0 rounded-full border-[3px] border-primary/20 animate-[spin_8s_linear_infinite]"></div>
                    <div className={`absolute inset-4 rounded-full border-[2px] border-dashed border-accent/40 animate-[spin_6s_linear_infinite_reverse] transition-all duration-300 ${isHoveringBot ? 'scale-110 border-accent/80' : ''}`}></div>
                    
                    {/* Core Core */}
                    <div className={`absolute inset-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.3)] transition-all duration-300 ${isHoveringBot ? 'scale-90 shadow-[0_0_50px_rgba(0,212,255,0.6)]' : ''}`}>
                        <Bot size={64} className={`text-white transition-all duration-300 ${isHoveringBot ? 'text-primary animate-pulse' : ''}`} />
                    </div>

                    {/* Ping indicators */}
                    {isHoveringBot && (
                         <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-accent animate-ping"></div>
                    )}
                </div>

                <h3 className="text-3xl font-headline font-bold text-white mb-4">AI Assistant <span className="text-primary tracking-widest text-sm font-mono align-top ml-2 px-2 py-1 bg-primary/10 rounded">ONLINE</span></h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 inline-flex items-start gap-3 backdrop-blur-md mb-8 max-w-sm relative">
                    <div className="absolute -left-2 top-6 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-white/5"></div>
                    <MessageSquare size={20} className="text-accent mt-0.5" />
                    <p className="text-sm text-gray-300 font-light leading-relaxed">
                        Initializing form... Ready to transmit your data packet directly to Siva&apos;s primary inbox. 
                    </p>
                </div>

                <div className="flex gap-4">
                    <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-primary/20 hover:text-primary transition-colors text-gray-400">
                        <Github size={20} />
                    </a>
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-accent/20 hover:text-accent transition-colors text-gray-400">
                        <Linkedin size={20} />
                    </a>
                    <a href={`mailto:${socialLinks.email}`} className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-green-400/20 hover:text-green-400 transition-colors text-gray-400">
                        <Mail size={20} />
                    </a>
                </div>
            </motion.div>

            {/* Right Form Side */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <div className="glass-card p-8 md:p-10 border-primary/20 bg-background/60 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Identifier (Name)</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} className="bg-black/40 border-white/10 focus-visible:ring-primary/50 text-white placeholder:text-gray-600 h-12" />
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs font-mono" />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Return Protocol (Email)</FormLabel>
                            <FormControl>
                                <Input placeholder="your@email.com" {...field} className="bg-black/40 border-white/10 focus-visible:ring-primary/50 text-white placeholder:text-gray-600 h-12" />
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs font-mono" />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Data Payload (Message)</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Type your message here..." {...field} rows={4} className="bg-black/40 border-white/10 focus-visible:ring-primary/50 text-white placeholder:text-gray-600 resize-none py-3" />
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs font-mono" />
                            </FormItem>
                        )}
                        />
                        <Button 
                            type="submit" 
                            className="w-full h-14 bg-primary hover:bg-primary/80 text-background font-bold tracking-wide shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:shadow-[0_0_25px_rgba(0,212,255,0.5)] transition-all"
                        >
                            <Send className="w-5 h-5 mr-2" />
                            Transmit Package
                        </Button>
                    </form>
                    </Form>
                </div>
            </motion.div>
        
        </div>
      </div>
    </section>
  );
}
