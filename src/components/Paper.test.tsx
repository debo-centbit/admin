import React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import Paper from './Paper'; 
import { createRoot } from 'react-dom/client';
import App from '../App';

describe('Paper Component', () => {
    let container: HTMLDivElement

   
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        act(() => {
            createRoot(container).render(<Paper />);
        });
    });

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
    })

    it('Renders without errors', () => {
        const inputs = container.querySelectorAll('input');
        expect(inputs).toHaveLength(14);
    });

    it('It renders correctly initial document with data-test query', () => {
       expect(container.querySelector("[data-test='organization-form']")).toBeInTheDocument();
        
    });

    it('it renders crendentials correctly', () => {
        const inputs = container.querySelectorAll('input');
    });

    it('Displays error messages for empty input fields', () => {
        act(() => {
            fireEvent.click(screen.getByText('Submit'));
        });
    });


});


