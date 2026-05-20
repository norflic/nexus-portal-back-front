import {describe, expect, it, vi} from 'vitest'
import {fireEvent, render, screen} from '@testing-library/react'
import Paging from './Paging'

describe('Paging', () => {
    it('affiche la page courante', () => {
        const mockOnPageChange = vi.fn()
        render(<Paging totalItems={20} itemsPerPage={5} onPageChange={mockOnPageChange}/>)

        expect(screen.getByTestId('page-info')).toHaveTextContent('page 1 / 4')
    })

    it('appelle onPageChange quand on clique sur suivant', () => {
        const mockOnPageChange = vi.fn()
        render(<Paging totalItems={20} itemsPerPage={5} onPageChange={mockOnPageChange}/>)

        const nextButton = screen.getByTestId('next-page-button')
        fireEvent.click(nextButton)

        expect(mockOnPageChange).toHaveBeenCalledWith(2)
    })

    it('appelle onPageChange quand on clique sur précédent', () => {
        const mockOnPageChange = vi.fn()
        render(<Paging totalItems={20} itemsPerPage={5} onPageChange={mockOnPageChange}/>)

        // Aller à la page 2 d'abord
        const nextButton = screen.getByTestId('next-page-button')
        fireEvent.click(nextButton)

        // Retour à la page 1
        const prevButton = screen.getByTestId('previous-page-button')
        fireEvent.click(prevButton)

        expect(mockOnPageChange).toHaveBeenCalledWith(1)
    })

    it('ne descend pas en dessous de la page 1', () => {
        const mockOnPageChange = vi.fn()
        render(<Paging totalItems={20} itemsPerPage={5} onPageChange={mockOnPageChange}/>)

        const prevButton = screen.getByTestId('previous-page-button')
        fireEvent.click(prevButton)

        // Ne doit pas être appelé car déjà à la page 1
        expect(mockOnPageChange).not.toHaveBeenCalled()
    })

    it('ne dépasse pas la dernière page', () => {
        const mockOnPageChange = vi.fn()
        render(<Paging totalItems={8} itemsPerPage={5} onPageChange={mockOnPageChange}/>)

        const nextButton = screen.getByTestId('next-page-button')
        fireEvent.click(nextButton) // Page 2
        fireEvent.click(nextButton) // Tentative page 3 (n'existe pas)

        // Doit être appelé une seule fois
        expect(mockOnPageChange).toHaveBeenCalledTimes(1)
    })

    it('page précédente renvoie toujours une page inférieure ou égale', () => {
        const mockOnPageChange = vi.fn()
        render(<Paging totalItems={20} itemsPerPage={5} onPageChange={mockOnPageChange}/>)

        const nextButton = screen.getByTestId('next-page-button')
        const prevButton = screen.getByTestId('previous-page-button')

        // Aller à la page 3
        fireEvent.click(nextButton) // Page 2
        fireEvent.click(nextButton) // Page 3

        // Revenir en arrière
        fireEvent.click(prevButton) // Doit être <= 3

        const lastCall = mockOnPageChange.mock.calls[mockOnPageChange.mock.calls.length - 1][0]
        expect(lastCall).toBeLessThanOrEqual(3)
        expect(lastCall).toBe(2) // Devrait être exactement 2
    })

    it('page suivante renvoie toujours une page supérieure ou égale', () => {
        const mockOnPageChange = vi.fn()
        render(<Paging totalItems={20} itemsPerPage={5} onPageChange={mockOnPageChange}/>)

        const nextButton = screen.getByTestId('next-page-button')

        // Page initiale = 1
        fireEvent.click(nextButton)

        const lastCall = mockOnPageChange.mock.calls[mockOnPageChange.mock.calls.length - 1][0]
        expect(lastCall).toBeGreaterThanOrEqual(1)
        expect(lastCall).toBe(2) // Devrait être exactement 2
    })
})
