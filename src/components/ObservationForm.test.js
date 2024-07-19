import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ObservationForm from './ObservationForm'
import userEvent from '@testing-library/user-event'

test('<ObservationForm /> updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()
    const createObservation = jest.fn()
  
    render(<ObservationForm createObservation={createObservation} />)
  
    const laji = screen.getByPlaceholderText('laji')
    //const maara = screen.getByPlaceholderText('maara')
    const paikka = screen.getByPlaceholderText('paikka')
    /*const aika = screen.getByText('aika*:')
    const kategoria = screen.getByText('kategoria*:')*/
    const sendButton = screen.getByText('Tallenna')
  
    await user.type(laji, 'testing a form...')
    //await user.type(maara, 1)
    await user.type(paikka, 'test')
    /*await user.type(aika, '2024-07-19')
    await user.type(kategoria, 'Perhoset')*/

    await user.click(sendButton)
  
    expect(createObservation.mock.calls).toHaveLength(1)
    expect(createObservation.mock.calls[0][0].species).toBe('testing a form...')
    expect(createObservation.mock.calls[0][0].place).toBe('test')
  })