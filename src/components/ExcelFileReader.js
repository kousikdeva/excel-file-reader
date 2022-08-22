import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import { useDispatch, useSelector } from 'react-redux'

import ExcelTable from './ExcelTable'
import AddFileButton from './AddFileButton'
import { SET_HEADING, SET_CONTENT } from './redux/actionType'

const ExcelFileReader = () => {
  const reduxState = useSelector(state => state.Reducer)
  const [heading, setHeading] = useState([])
  const [content, setContent] = useState([])
  const [documentName, setDocumentName] = useState('')
  const [isAdded, setIsAdded] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (reduxState.heading !== []) {
      setHeading(reduxState.heading)
      setContent(reduxState.content)
    }
  }, [reduxState])


  const onFileChange = (e) => {
    e.preventDefault()
    var files = e.target.files, f = files[0]
    if (f) {
      setIsAdded(true)
      setDocumentName(f.name)
      var reader = new FileReader()
      reader.onload = function (e) {
        var data = e.target.result
        let readedData = XLSX.read(data, { type: 'binary' })
        const wsname = readedData.SheetNames[0]
        const ws = readedData.Sheets[wsname]

        const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 })
        dispatch({ type: SET_HEADING, payload: dataParse.shift() })
        dispatch({ type: SET_CONTENT, payload: dataParse })
      };
      reader.readAsBinaryString(f)
    }
  }

  const handleRemoveFile = () => {
    setIsAdded(false)
    setHeading([])
    setContent([])
    setDocumentName('')
  }
  return (
    <>
      <AddFileButton onChange={onFileChange} isAdded={isAdded} handleRemoveFile={handleRemoveFile} />
      <ExcelTable heading={heading} content={content} setContent={setContent} documentName={documentName} />
    </>
  )
}

export default ExcelFileReader