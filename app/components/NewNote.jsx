import { Form, useActionData, useNavigation } from '@remix-run/react'
import { useRef } from 'react'
import styles from './NewNoteStyles.css'

const NewNote = () => {
  const navigation = useNavigation()
  const formRef = useRef()
  const { state } = navigation
  const isSubmitting = state == 'submitting'
  const data = useActionData()
  return (
    <Form ref={formRef} method="post" id="note-form">
      {data?.message && <p style={{ color: 'red' }}>{data.message}</p>}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows="5" required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Note'}
        </button>
      </div>
    </Form>
  )
}
export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}
export const ErrorBoundary = ({ error }) => {
  return <h1>Ooops</h1>
}
export default NewNote
