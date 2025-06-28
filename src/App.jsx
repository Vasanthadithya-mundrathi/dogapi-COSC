import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Loader2, RefreshCw, Search } from 'lucide-react'
import './App.css'

function App() {
  const [dogImages, setDogImages] = useState([])
  const [allBreeds, setAllBreeds] = useState({})
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredImages, setFilteredImages] = useState([])

  // Fetch all breeds on component mount
  useEffect(() => {
    fetchAllBreeds()
    fetchRandomImages()
  }, [])

  // Filter images based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredImages(dogImages)
    } else {
      const filtered = dogImages.filter(image => 
        image.breed.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredImages(filtered)
    }
  }, [dogImages, searchTerm])

  const fetchAllBreeds = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/list/all')
      const data = await response.json()
      if (data.status === 'success') {
        setAllBreeds(data.message)
      }
    } catch (error) {
      console.error('Error fetching breeds:', error)
    }
  }

  const fetchRandomImages = async () => {
    setLoading(true)
    try {
      // Fetch 8 random images to ensure we have at least 5
      const response = await fetch('https://dog.ceo/api/breeds/image/random/8')
      const data = await response.json()
      
      if (data.status === 'success') {
        const imagesWithBreeds = data.message.map(imageUrl => {
          // Extract breed from URL (format: https://images.dog.ceo/breeds/breed-name/image.jpg)
          const urlParts = imageUrl.split('/')
          const breedPart = urlParts[4] // breeds/breed-name part
          let breed = breedPart
          
          // Handle sub-breeds (format: breed-subbreed)
          if (breedPart.includes('-')) {
            const parts = breedPart.split('-')
            breed = parts.length > 1 ? `${parts[0]} ${parts[1]}` : parts[0]
          }
          
          return {
            url: imageUrl,
            breed: breed.charAt(0).toUpperCase() + breed.slice(1),
            id: Math.random().toString(36).substr(2, 9)
          }
        })
        
        setDogImages(imagesWithBreeds)
      }
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    fetchRandomImages()
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🐕 Dog Image Viewer</h1>
          <p className="text-gray-600">Discover adorable dogs from around the world!</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by breed (e.g., labrador, bulldog)..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
          <Button 
            onClick={handleRefresh} 
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            {loading ? 'Loading...' : 'Refresh Images'}
          </Button>
        </div>

        {/* Results count */}
        {searchTerm && (
          <div className="text-center mb-4">
            <p className="text-gray-600">
              Found {filteredImages.length} image{filteredImages.length !== 1 ? 's' : ''} 
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2 text-gray-600">Fetching adorable dogs...</span>
          </div>
        )}

        {/* Images grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={image.url}
                      alt={`${image.breed} dog`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 text-center">
                      {image.breed}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No results message */}
        {!loading && filteredImages.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No dogs found matching "{searchTerm}". Try a different breed name!
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Powered by Dog CEO API • Images are fetched in real-time</p>
        </div>
      </div>
    </div>
  )
}

export default App

