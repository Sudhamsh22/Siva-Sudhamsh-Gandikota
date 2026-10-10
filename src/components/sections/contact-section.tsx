'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { socialLinks } from '@/lib/data';
import { Github, Linkedin, Mail, Send, MapPin, ArrowUpRight, Loader2, CheckCircle2, Copy } from 'lucide-react';
import { Card } from '@/components/ui/card';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Direct email client trigger with prefilled payload
      const to = socialLinks.email;
      const subject = encodeURIComponent(`Portfolio Inquiry from ${values.name}`);
      const body = encodeURIComponent(
        `${values.message}\n\n---\nSender: ${values.name} (${values.email})`,
      );

      const mailtoUrl = `mailto:${to}?subject=${subject}&body=${body}`;
      window.location.href = mailtoUrl;

      setIsSent(true);
      toast({
        title: 'Draft Prepared',
        description: 'Opening your email client to send your message directly to Siva.',
      });
      form.reset();
    } catch {
      toast({
        title: 'Error',
        description: 'Could not trigger email client. Please email sivasudhamsh2005@gmail.com directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-eyebrow">Get in Touch</p>
        <h2 className="section-heading">Contact & Collaboration</h2>
        <p className="section-subheading">
          Whether you have an engineering role, freelance project, or technical question, let&apos;s talk.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Direct channels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-5 h-full"
        >
          <Card className="glass-card flex h-full flex-col justify-between rounded-2xl p-6 sm:p-8 border-border/80">
            <div>
              <h3 className="font-headline text-xl font-bold text-foreground">
                Direct Channels
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                Connect directly through verified profiles or reach out via email.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3.5 transition-all duration-200 hover:border-primary/40 hover:bg-white/[0.05] group">
                  <a
                    href={`mailto:${socialLinks.email}`}
                    className="flex items-center gap-3.5 flex-1 overflow-hidden"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 group-hover:scale-105 transition-transform flex-shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-mono uppercase text-muted-foreground">Email</p>
                      <p className="text-sm font-medium text-foreground truncate">{socialLinks.email}</p>
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      navigator.clipboard.writeText(socialLinks.email);
                      toast({
                        title: 'Email Copied',
                        description: `${socialLinks.email} copied to clipboard!`,
                      });
                    }}
                    aria-label="Copy Email address"
                    className="ml-2 rounded-lg p-1.5 text-muted-foreground hover:bg-white/10 hover:text-primary transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>

                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3.5 transition-all duration-200 hover:border-primary/40 hover:bg-white/[0.05] group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-400/10 text-sky-400 border border-sky-400/20 group-hover:scale-105 transition-transform">
                      <Linkedin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase text-muted-foreground">LinkedIn</p>
                      <p className="text-sm font-medium text-foreground">/in/sivasudhamsh</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </a>

                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3.5 transition-all duration-200 hover:border-primary/40 hover:bg-white/[0.05] group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-300/10 text-slate-200 border border-white/20 group-hover:scale-105 transition-transform">
                      <Github className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase text-muted-foreground">GitHub</p>
                      <p className="text-sm font-medium text-foreground">Sudhamsh22</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </a>

                <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase text-muted-foreground">Location</p>
                      <p className="text-sm font-medium text-foreground">{socialLinks.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/30">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Response time: usually under 24 hours. Open to SWE & AI opportunities.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Right Column: Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-7 h-full"
        >
          <Card className="glass-card flex h-full flex-col justify-between rounded-2xl p-6 sm:p-8 border-border/80">
            <div>
              <h3 className="font-headline text-xl font-bold text-foreground mb-1.5">
                Send a Message
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Fill out the form below to initiate a conversation directly.
              </p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {/* Honeypot field to block automated spam bots */}
                  <input
                    type="text"
                    name="_honey"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-mono uppercase text-muted-foreground">
                          Your Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Alex Morgan"
                            {...field}
                            disabled={isSubmitting}
                            className="h-11 rounded-xl border-border/70 bg-card/60 focus-visible:ring-primary text-foreground placeholder:text-muted-foreground"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-mono uppercase text-muted-foreground">
                          Your Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="alex@company.com"
                            {...field}
                            disabled={isSubmitting}
                            className="h-11 rounded-xl border-border/70 bg-card/60 focus-visible:ring-primary text-foreground placeholder:text-muted-foreground"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-mono uppercase text-muted-foreground">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me about your team, project, or role..."
                            rows={4}
                            {...field}
                            disabled={isSubmitting}
                            className="rounded-xl border-border/70 bg-card/60 focus-visible:ring-primary text-foreground placeholder:text-muted-foreground resize-none"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-primary text-primary-foreground font-semibold shadow-md shadow-sky-500/20 hover:bg-primary/90 transition-all mt-3 h-11"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Preparing Note...
                      </>
                    ) : isSent ? (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Sent to Email Client
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
