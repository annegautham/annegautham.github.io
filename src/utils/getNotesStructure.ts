import { getCollection, type CollectionEntry } from "astro:content";

export interface NotesSubject {
  slug: string;
  title: string;
  notes: CollectionEntry<"notes">[];
  color?: string; // Color theme for the subject
  tags: string[]; // All unique tags from notes in this subject
}

export interface NotesStructure {
  subjects: NotesSubject[];
  totalNotes: number;
}

/**
 * Gets all notes organized by subject (folder structure)
 * Each subject corresponds to a folder in content/notes/
 */
export async function getNotesStructure(): Promise<NotesStructure> {
  const allNotes = await getCollection("notes");

  // Group notes by subject (first part of slug before '/')
  const subjectMap = new Map<string, CollectionEntry<"notes">[]>();

  allNotes.forEach(note => {
    // Skip index files and extract subject from slug
    if (note.slug.endsWith("/index") || !note.slug.includes("/")) {
      return;
    }

    const subject = note.slug.split("/")[0];
    if (!subjectMap.has(subject)) {
      subjectMap.set(subject, []);
    }
    subjectMap.get(subject)!.push(note);
  });

  // Convert to sorted subjects array
  const subjects: NotesSubject[] = Array.from(subjectMap.entries())
    .map(([slug, notes]) => {
      // Get color from first note that has one, or default
      const subjectColor = notes.find(note => note.data.color)?.data.color;

      // Get all unique tags from all notes in this subject
      const allTags = notes.flatMap(note => note.data.tags || []);
      const uniqueTags = [...new Set(allTags)].sort();

      return {
        slug,
        title: formatSubjectTitle(slug),
        notes: notes.sort((a, b) => (a.data.order || 0) - (b.data.order || 0)),
        color: subjectColor,
        tags: uniqueTags,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  return {
    subjects,
    totalNotes: allNotes.length,
  };
}

/**
 * Converts folder slug to readable title
 * e.g., "ashcroft_mermin" -> "Ashcroft Mermin"
 * e.g., "control_theory" -> "Control Theory"
 */
function formatSubjectTitle(slug: string): string {
  return slug.replace(/[-_]/g, " ").replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Gets a specific note and its context (subject + siblings)
 */
export async function getNoteWithContext(noteSlug: string) {
  const notesStructure = await getNotesStructure();
  const allNotes = await getCollection("notes");

  const currentNote = allNotes.find(note => note.slug === noteSlug);
  if (!currentNote) return null;

  const subject = noteSlug.split("/")[0];
  const currentSubject = notesStructure.subjects.find(s => s.slug === subject);

  // If no subject found, create a default one
  if (!currentSubject) {
    return {
      note: currentNote,
      subject: {
        slug: subject,
        title: formatSubjectTitle(subject),
        notes: [currentNote],
        color: currentNote.data.color,
        tags: currentNote.data.tags || [],
      },
      allSubjects: notesStructure.subjects,
    };
  }

  return {
    note: currentNote,
    subject: currentSubject,
    allSubjects: notesStructure.subjects,
  };
}
