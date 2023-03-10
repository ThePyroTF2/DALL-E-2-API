import React from 'react';
import { useState } from 'react';
import '../css/SearchBar.css'
import Fuse from 'fuse.js';
import { RippleButton } from './RippleButton';
import type { ObjectArrayImages } from '../App'
import type { ImageObject } from '../App'

type props = {
    ImageList: ObjectArrayImages
    UpdateImagesFunction: Function
}

function SearchBar(props: props) {
    type FuseItem = {
        item: any
    }

    const [promptQuery, setPromptQuery] = useState('')
    const [startDate, setStartDate] = useState(0)
    const [endDate, setEndDate] = useState(Infinity)

    const search = (query: string, startDate: number, endDate: number) => {
        let filteredImageList: any = new Fuse(props.ImageList.images, {
            keys: ['prompt']
        })
        filteredImageList = {
            images: filteredImageList
                .search(query)
                .filter((item: FuseItem)=> item.item.timestamp > startDate && item.item.timestamp < endDate)
                .map((item: FuseItem)=> {return item.item})
        }
        props.UpdateImagesFunction(query !== '' ? filteredImageList : props.ImageList)
    }

    return (
        <div className="searchBar">
            <input
                type="text"
                onChange = {event => {
                    setPromptQuery(event.target.value)
                }}
                onKeyDown = {event => {
                    if(event.key === 'Enter') search(promptQuery, 0, Infinity)
                }}
            />
            <br/>
            Date range:
            <br/>
            <input type="datetime-local" onChange={(event) => setStartDate(!!event.target.value ? Number(new Date(event.target.value)) : 0)}/> to <input type="datetime-local" onChange={(event) => setEndDate(!!event.target.value ? Number(new Date(event.target.value)) : Infinity)}/>
            <br/>
            <RippleButton search={search} prompt={promptQuery} startDate={startDate} endDate={endDate}>Search</RippleButton>
        </div>
    )
}

export default SearchBar