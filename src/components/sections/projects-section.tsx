import { generateProjectInsights } from '@/ai/flows/generate-project-insights';
import { projects } from '@/lib/data';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Github, ExternalLink } from 'lucide-react';

async function ProjectCard({ project }: { project: typeof projects[0] }) {
  let insight = project.description;

  if (project.id === 'autotuning-ai') {
    try {
      insight = await generateProjectInsights({
        projectName: project.name,
        description: project.description,
        stats: project.stats.map(s => `${s.value} ${s.label}`),
        techStack: project.tech,
      });
    } catch (error) {
      console.error("Failed to generate project insight:", error);
      // Fallback to description
      insight = project.description;
    }
  }

  const projectImage = PlaceHolderImages.find(p => p.id === project.id);

  return (
    <Card className="glass-card flex flex-col h-full group overflow-hidden">
      {projectImage && (
        <div className="overflow-hidden">
          <Image
            src={projectImage.imageUrl}
            alt={project.name}
            data-ai-hint={projectImage.imageHint}
            width={600}
            height={400}
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">{project.name}</CardTitle>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.stats.map(stat => (
            <Badge key={stat.label} variant="secondary">{stat.value} {stat.label}</Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm">{insight}</p>
        <div className="flex flex-wrap gap-2 pt-4">
          {project.tech.map(tech => (
            <Badge key={tech} variant="outline">{tech}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        {project.links.live && (
          <Button asChild>
            <a href={project.links.live} target="_blank" rel="noopener noreferrer">
              Live Demo <ExternalLink className="ml-2" />
            </a>
          </Button>
        )}
        {project.links.github && (
          <Button variant="outline" asChild>
            <a href={project.links.github} target="_blank" rel="noopener noreferrer">
              GitHub <Github className="ml-2" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects">
      <h2 className="section-heading">Projects Showcase</h2>
      <p className="section-subheading">
        Here are some of the projects I'm proud of. Each one represents a challenge I was excited to solve.
      </p>
      <div className="mt-16 grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
}
