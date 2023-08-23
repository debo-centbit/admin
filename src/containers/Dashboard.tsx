import { Typography,Box } from '@mui/material'
import React from 'react'
import AddOrganisation from './AddOrganisation'
import Modal from '../components/Modal'
const Dashboard = () => {
  return (
    <Box>
        <Typography  >ORGANIZATION TABLE</Typography>
        <Box >
          <AddOrganisation />
          <Modal />
        </Box>
    </Box>
  )
}
export default Dashboard

