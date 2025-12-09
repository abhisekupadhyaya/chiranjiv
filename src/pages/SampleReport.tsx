import { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// Set up the worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function SampleReport() {
  const [numPages, setNumPages] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setLoading(false)
  }

  // Disable right click to prevent easy saving
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }
    document.addEventListener('contextmenu', handleContextMenu)
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])

  const handleClose = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-background relative flex flex-col items-center pt-24 pb-8 px-4 sm:px-6">
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-24 right-4 z-50 rounded-full bg-background/80 backdrop-blur-sm border shadow-sm hover:bg-accent"
        onClick={handleClose}
      >
        <X className="h-6 w-6" />
        <span className="sr-only">Close</span>
      </Button>

      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[50vh] bg-muted/30 rounded-xl border border-border/50 p-4 sm:p-8">
          <Document
            file="/Chiranjiv_Genomics_Report.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            }
            error={
              <div className="text-destructive p-4 text-center">
                Failed to load the document. Please try again later.
              </div>
            }
            className="flex flex-col items-center gap-8"
          >
            {Array.from(new Array(numPages), (_, index) => (
              <div key={`page_${index + 1}`} className="shadow-lg rounded-lg overflow-hidden border border-border/40">
                <Page 
                  pageNumber={index + 1} 
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="max-w-full h-auto"
                  width={Math.min(window.innerWidth - 48, 1000)} // Responsive width
                />
              </div>
            ))}
          </Document>
        </div>
        
        {!loading && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Page 1 of {numPages}
          </div>
        )}
      </div>
    </div>
  )
}
