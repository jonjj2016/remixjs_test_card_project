import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getStoredNotes } from '~/data/notes'
import styles from '~/styles/note-details.css'

export const links = () => [{ rel: 'stylesheet', href: styles }]

export const loader = async ({ request, params }) => {
  const notes = await getStoredNotes()
  const { data: project } = await axios.get(
    'http://localhost:3003/v3/projects/63bd222736ce67000e3d5302',
  )
  console.log(project)
  const { noteId } = params
  const note = notes.find((note) => note.id == noteId)
  if (!note) {
    throw json(
      { message: "Could'nt find note by this id" },
      {
        status: 404,
        statusText: 'Not found Your Note',
      },
    )
  }
  return note
}

export const meta = ({ data }) => {
  return {
    title: data.title,
    description: data.content,
  }
}

const NoteItem = () => {
  const note = useLoaderData()

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note?.title || 'NOTE TITLE'}</h1>
      </header>
      <p id="note-details-content">{note?.content || 'NOTE CONTENT'}</p>
    </main>
  )
}

export default NoteItem
