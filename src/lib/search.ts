import Fuse from 'fuse.js';

export interface SearchableProject {
  id: string;
  title: string;
  description: string;
  domain: string[];
  capability: string[];
  workType: string[];
  keywords: string[];
}

export function projectTags(p: { domain: string[]; capability: string[]; workType: string[] }) {
  return [...p.domain, ...p.capability, ...p.workType];
}

const FUSE_OPTIONS = {
  includeScore: true,
  threshold: 0.4,
  ignoreLocation: true,
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'tags', weight: 0.25 },
    { name: 'domain', weight: 0.15 },
    { name: 'capability', weight: 0.1 },
    { name: 'description', weight: 0.05 },
    { name: 'keywords', weight: 0.05 },
  ],
};

export function filterProjects(
  projects: SearchableProject[],
  query: string,
  activeTags: string[],
): SearchableProject[] {
  const q = query.trim();
  const tagOk = (p: SearchableProject) => activeTags.every((t) => projectTags(p).includes(t));

  if (!q) return projects.filter(tagOk);

  const index = new Fuse(
    projects.map((p) => ({ ...p, tags: projectTags(p) })),
    FUSE_OPTIONS,
  );
  const results = index.search(q).map((r) => r.item);
  return results.filter(tagOk);
}
