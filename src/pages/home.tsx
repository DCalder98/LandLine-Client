import { useList } from '@pankod/refine-core';
import { Box, Stack, Typography } from '@pankod/refine-mui';

import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
  TopAgent

} from 'components'
const Home = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color='#11142D'>
        Dashboard
      </Typography>

      <Box mt='20px' display='flex' flexWrap='wrap' gap={4}>
        <PieChart
        title='Properties For Sale'
        value={684}
        series={[75, 25]}
        colors={['#475be8', '#FFA500']}

        />
        <PieChart
        title='Properties For Rent'
        value={227}
        series={[60, 40]}
        colors={['#445ce8', '#FFA500']}

        />
        <PieChart
        title='Total Customers'
        value={5684}
        series={[75, 25]}
        colors={['#475be8', '#FFA500']}

        />
        <PieChart
        title='Total Cities'
        value={555}
        series={[75, 25]}
        colors={['#475be8', '#FFA500']}

        />

      </Box>
      <Stack
      mt='25px' width='100%'
      direction={{xs: 'column', lg:'row'}}
      gap={4}
      >
        <TotalRevenue/>
        <PropertyReferrals/>

      </Stack>
    </Box>
  )
}

export default Home