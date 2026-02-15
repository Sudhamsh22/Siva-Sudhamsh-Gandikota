import { projects } from '@/lib/data';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Github, ExternalLink } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const insight = project.description;

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
      <CardHeader className="p-3">
        <CardTitle className="font-headline text-lg text-primary">{project.name}</CardTitle>
        <div className="flex flex-wrap gap-1 pt-1.5">
          {project.stats.map(stat => (
            <Badge key={stat.label} variant="secondary" className="text-xs">{stat.value} {stat.label}</Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-3 pt-0">
        <p className="text-muted-foreground text-xs line-clamp-3">{insight}</p>
        <div className="flex flex-wrap gap-1.5 pt-3">
          {project.tech.map(tech => (
            <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 p-3">
        {project.links.live && (
          <Button asChild size="sm">
            <a href={project.links.live} target="_blank" rel="noopener noreferrer">
              Live <ExternalLink className="ml-1.5" />
            </a>
          </Button>
        )}
        {project.links.github && (
          <Button variant="outline" asChild size="sm">
            <a href={project.links.github} target="_blank" rel="noopener noreferrer">
              GitHub <Github className="ml-1.5" />
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
      <div className="mt-16 relative px-12">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {projects.map((project, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <ProjectCard project={project} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
