import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import BasicTable from './BasicTable'

describe('BasicTable', () => {
    const mockTitle = "Test Table"
    const mockTitles = ["Col1", "Col2", "Col3"]
    const mockData = [
        ["A1", "A2", "A3"],
        ["B1", "B2", "B3"],
        ["C1", "C2", "C3"],
        ["D1", "D2", "D3"],
        ["E1", "E2", "E3"],
        ["F1", "F2", "F3"],
        ["G1", "G2", "G3"],
        ["H1", "H2", "H3"],
    ]

    it('affiche les 4 premières lignes sur la page 1', () => {
        render(<BasicTable titleProp={mockTitle} titlesListProp={mockTitles} dataProp={mockData} />)
        
        // Vérifier que les 4 premières lignes sont affichées
        expect(screen.getByText("A1")).toBeInTheDocument()
        expect(screen.getByText("B1")).toBeInTheDocument()
        expect(screen.getByText("C1")).toBeInTheDocument()
        expect(screen.getByText("D1")).toBeInTheDocument()
        
        // Vérifier que la 5ème ligne n'est pas affichée
        expect(screen.queryByText("E1")).not.toBeInTheDocument()
    })

    it('affiche les lignes 5-8 sur la page 2', () => {
        render(<BasicTable titleProp={mockTitle} titlesListProp={mockTitles} dataProp={mockData} />)
        
        const nextButton = screen.getByTestId('next-page-button')
        fireEvent.click(nextButton)
        
        // Vérifier que les lignes 5-8 sont affichées
        expect(screen.getByText("E1")).toBeInTheDocument()
        expect(screen.getByText("F1")).toBeInTheDocument()
        expect(screen.getByText("G1")).toBeInTheDocument()
        expect(screen.getByText("H1")).toBeInTheDocument()
        
        // Vérifier que les premières lignes ne sont plus affichées
        expect(screen.queryByText("A1")).not.toBeInTheDocument()
        expect(screen.queryByText("B1")).not.toBeInTheDocument()
    })

    it('affiche correctement toutes les cellules d\'une ligne', () => {
        render(<BasicTable titleProp={mockTitle} titlesListProp={mockTitles} dataProp={mockData} />)
        
        // Vérifier que toutes les cellules de la première ligne sont présentes
        expect(screen.getByText("A1")).toBeInTheDocument()
        expect(screen.getByText("A2")).toBeInTheDocument()
        expect(screen.getByText("A3")).toBeInTheDocument()
    })

    it('affiche un avertissement si une ligne a plus de cellules que de titres', () => {
        const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
        
        const invalidData = [
            ["A1", "A2", "A3", "A4"], // 4 cellules mais seulement 3 titres
            ["B1", "B2", "B3"],
        ]
        
        render(<BasicTable titleProp={mockTitle} titlesListProp={mockTitles} dataProp={invalidData} />)
        
        // Vérifier que console.warn a été appelé
        expect(consoleWarnSpy).toHaveBeenCalled()
        
        consoleWarnSpy.mockRestore()
    })

})
