import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import Router from './router'
import { ColorModeScript, theme } from '@chakra-ui/react';

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <QueryClientProvider client={queryClient}>
            <Router />
            <ReactQueryDevtools />
        </QueryClientProvider>
    </StrictMode>
)