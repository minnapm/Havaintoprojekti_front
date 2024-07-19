import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Observation from './Observation'

test('renders content', () => {
    const user = userEvent.setup()

    const observation = {
        species: "Kiuru",
        amount: 2,
        place: "Hämeenlinna",
        date: "2024-07-15",
        category: "Linnut",
        details: "Laulelevat lentäessään",
    }

  
    render(<Observation observation={observation} />)
  
    screen.debug()
  
    const element = screen.getByText('Kiuru')
    expect(element).toBeDefined()
  })