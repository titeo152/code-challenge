import { useState } from 'react'
import { Box, Container, Tab, Tabs } from '@mui/material'
import Problem2 from './problem2'
import { Problem1 } from './problem1'
import { CustomTabPanel } from './components/CustomTabPanel'
import { Problem3 } from './problem3'

function App() {
  const [value, setValue] = useState(0)
  const handleChange = (_: React.SyntheticEvent, value: number) => {
    setValue(value)
  }

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  return (
    <>
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh', width: '100vw' }}>
        <Box sx={{ border: 1, borderColor: 'divider', margin: 'auto', borderRadius: '10px', maxWidth: '1000px' }}>
          <Tabs sx={{ width: '100%', borderColor: 'divider', borderBottom: 1 }} value={value} onChange={handleChange} aria-label='basic tabs example'>
            <Tab label='Problem 1' {...a11yProps(0)} />
            <Tab label='Problem 2' {...a11yProps(1)} />
            <Tab label='Problem 3' {...a11yProps(2)} />
          </Tabs>
          <Container sx={{ minHeight: '500px', minWidth: '1000px' }}>
            <CustomTabPanel value={value} index={0}>
              <Problem1 />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Problem2 />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Problem3 />
            </CustomTabPanel>
          </Container>
        </Box>
      </Container>
    </>
  )
}

export default App
