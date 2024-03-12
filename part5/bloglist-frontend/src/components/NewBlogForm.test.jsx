import { render, screen } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'

test('<NewBlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<NewBlogForm createBlog={createBlog} />)

  //const input = screen.getByText('Title:')
  const titleInput = screen.getByLabelText('Title:')
  const sendButton = screen.getByText('create')
  screen.debug()
  await user.type(titleInput, 'testing a form...')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  console.log('mock calls',createBlog.mock.calls)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
})