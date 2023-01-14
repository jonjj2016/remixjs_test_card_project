import { json, redirect, useLoaderData } from 'react-router'
import NewNote, { links as NewNoteLinks } from '~/components/NewNote'
import { getStoredNotes, storeNotes } from '~/data/notes'
import NoteList, { links as NoteListLinks } from '~/components/NoteList'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const noteData = {
    ...Object.fromEntries(formData),
    id: new Date().toISOString(),
  }
  if (noteData.title.trim().length < 5) {
    return {
      message: 'invalid Title',
    }
  }
  const existingNotes = await getStoredNotes()
  const updatedNotes = existingNotes.concat(noteData)
  await storeNotes(updatedNotes)

  return redirect(`/notes/`)
}

export const loader = async () => {
  const notes = await getStoredNotes()
  if (!notes) {
    throw json(
      {
        message: "Couldn't find any Notes.",
      },
      {
        status: 404,
        statusText: 'Not Found',
      },
    )
  }
  return notes
}

const Notes = () => {
  const notes = useLoaderData()
  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  )
}

export function links() {
  return [...NewNoteLinks(), ...NoteListLinks()]
}

export default Notes
