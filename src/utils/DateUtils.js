import React from 'react'
import Time from 'react-time'

export default {

	formattedDate: (date) => {

        const now = new Date().getTime()

        const diff = now - new Date(date).getTime() // seconds???


        const seconds = diff /1000
        const mins = seconds / 60
        const hours = mins / 60
        console.log('DIFF: '+hours)  

        if (hours < 24)
            return <Time value={date} format="MMM DD, YYYY" relative />      

		return <Time value={date} format="MMM DD, YYYY" />
	}
}