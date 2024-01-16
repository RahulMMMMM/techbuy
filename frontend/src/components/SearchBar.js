import { useEffect,useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import axios from "../api/Axios";
import debounce from 'debounce'

export default function SearchBar(){

    const navigate = useNavigate();

  const [currentValue, setCurrentValue] = useState('')
  const [autocompleteResults, setAutocompleteResults] = useState("")
  const [selectedAutocompleteResultIndex, setSelectedAutocompleteResultIndex] = useState(0)
  const [overlay, setOverlay] = useState(false)

  const runSearch = async (query) => {
    if(window.location.pathname.startsWith('/search')){
      navigate(`/search?k=${query}`)
      navigate(0)
    }
    navigate(`/search?k=${query}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAutocompleteResultIndex !== null) {
      runSearch(autocompleteResults[selectedAutocompleteResultIndex])
    } else {
      console.log(currentValue)
      runSearch(currentValue)
    }
  }

  const onInputChange = async (e) => {
    setSelectedAutocompleteResultIndex(null)
    const query = e.target.value

    setCurrentValue(query)

    if (query) {
      try{
        const response = await axios.get(`products/autocomplete?k=${query}`)
        setAutocompleteResults((response.data.products.map((p) => p.title)).slice(0,10))
      }
      catch(err){
        console.log(err)
      }
    } else {
      setAutocompleteResults([])

    }
  }

  const onInputKeypress = (event) => {
    if (event.code === 'ArrowDown') {
      const current = selectedAutocompleteResultIndex === null ? -1 : selectedAutocompleteResultIndex
      if (current === autocompleteResults.length - 1) {
        setSelectedAutocompleteResultIndex(0)
      } else {
        setSelectedAutocompleteResultIndex(current + 1)
      }
    }
    if (event.code === 'ArrowUp') {
      const current =
        selectedAutocompleteResultIndex === null
          ? autocompleteResults.length
          : selectedAutocompleteResultIndex
      if (current === 0) {
        setSelectedAutocompleteResultIndex(autocompleteResults.length - 1)
      } else {
        setSelectedAutocompleteResultIndex(current - 1)
      }
    }
  }

  const leaveSearch = () =>{
    setOverlay(false)
    setAutocompleteResults([])
  }

   


    return(
        <div>
            <form className='search-form' 
                onSubmit={handleSubmit} 
                onChange={debounce(onInputChange, 100)}
                onKeyDown={onInputKeypress}
                onClick = {() => {setOverlay(true)}}
                >
                <input type='text' placeholder=' Search anything!' className='searchbox'   />
                <button type='submit' className='search-button'><SearchIcon /></button>
            </form>
       
            {autocompleteResults.length >= 1 && (
              <div className="autocomplete-results">
                {autocompleteResults.map((result, index) => {
                    return (
                      <>
                        <div
                            key={index}
                            onClick={() => runSearch(result)}
                            onMouseOver={() => setSelectedAutocompleteResultIndex(index)}
                            onMouseOut={() => setSelectedAutocompleteResultIndex(null)}
                            className={selectedAutocompleteResultIndex===index?"autocomplete-result-selected":"autocomplete-result"}
                        >
                            {result}
                        </div>
                      </>
                    )
                })}
                </div>
            )}
            {overlay &&
              <div className="resultsOverlay" onClick={() => {leaveSearch()}}>
              </div>
            }
        </div>


    )
}

    