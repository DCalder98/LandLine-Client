import { Typography, Box, Stack, margin } from "@pankod/refine-mui"
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core"
import { useParams, useNavigate } from "@pankod/refine-react-router-v6"
import { ChatBubble, Delete, Edit, Phone, Place, Star, } from "@mui/icons-material"
import { CustomButton } from "components"
import { map } from "assets"


const PropertyDetails = () => {
  const navigate = useNavigate()
  const { data: user } = useGetIdentity()
  const { id } = useParams()
  const { mutate } = useDelete()
  const { queryResult } = useShow()

  const { data, isLoading, isError } = queryResult

  const propertyDetails = data?.data ?? {}

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  console.log(data)

  const isCurrentUser = user.email === propertyDetails.creator.email;

  const handleDeleteProperty = () => {
    const response = window.confirm(
      "Are you sure you want to delete this property?",
    );
    if (response) {
      //eslint-disable-line
      console.log('deleted')
      mutate(
        {
          resource: "properties",
          id: id as string,
        },
        {
          onSuccess: () => {
            navigate("/properties");
          },
        }
      );
    }
  };

  return (
    <>
      <Box display='flex' flexWrap='wrap' width='auto'>
        <Box borderRadius='15px'
          padding='20px'
          bgcolor='#fcfcfc'
          width='fit-content'
          mr='5px'
        >
          <Typography fontSize={25} fontWeight={700} color='#11142d'>
            Details
          </Typography>
          <Box
            mt='20px'
            display='flex'
            flexDirection={{
              xs: 'column', lg: 'row'
            }}
            gap={4}
          >
            <Box flex={1} maxWidth={1100}>
              <img src={propertyDetails.photo} alt={propertyDetails.title} height={500} style={{
                objectFit: 'cover',
                borderRadius: '10px'
              }}
                className='property_details-img' />
              <Box
                mt='15px'
              >
                <Stack direction='row' justifyContent='space-between' flexWrap='wrap' alignItems='center'>
                  <Typography fontSize={18} fontWeight={500} color='#11142d' textTransform='capitalize'>
                    {propertyDetails.propertyType}
                  </Typography>
                  <Box>
                    {[1, 2, 3, 4, 5].map((star) => <Star key={`star-${star}`} sx={{
                      color: '#f2c94c'
                    }} />)}
                  </Box>
                </Stack>
                <Stack direction='row' justifyContent='space-between' flexWrap='wrap' alignItems='center'>
                  <Box>

                    <Typography fontSize={22} fontWeight={600} color='#11142d' textTransform='capitalize'>
                      {propertyDetails.title}
                    </Typography>

                    <Stack mt={0.5} direction='row' alignItems='center' gap={0.5}>
                      <Place sx={{ color: '#808191' }} />
                      <Typography fontSize={14} color='#808191'>{propertyDetails.location}</Typography>

                    </Stack>
                  </Box>
                  <Box>
                    <Stack>
                      <Typography fontSize={15}>Price</Typography>
                      <Box display='flex' flexDirection='row' alignItems='flex-end'>
                        <Typography fontSize={24} fontWeight={600} color='#475be8'>{`\$${propertyDetails.price}`}</Typography>
                        <Typography fontSize={12} ml='10px' mb='5px'>/Night</Typography>
                      </Box>
                    </Stack>

                  </Box>
                </Stack>
                <Typography mt={4}>Description</Typography>
                <Typography>{propertyDetails.description}</Typography>
              </Box>
            </Box>

          </Box>

        </Box>
        <Box borderRadius='15px'
          width='100%'
          padding='5px'
          bgcolor='#fbfbfb'
          display='flex'
          justifyContent='space-between'
          flexDirection='column'
          alignItems='center'
          maxWidth={326}
        >
          <Box width='100%'
            padding='20px'
            bgcolor='#fcfcfc'
            display='flex'
            flexDirection='column'
            alignItems='center'
            maxWidth={326}>

            <img src={propertyDetails.creator.avatar} alt='Profile Image' style={{
              objectFit: 'cover',
              borderRadius: '50%',
              height: 175,
              margin: '10px 0'
            }} />
            <Typography fontSize={24} fontWeight={500} color='#11142d'>{propertyDetails.creator.name}</Typography>
            <Typography fontSize={12} fontWeight={300} color='#808191'>Agent</Typography>
            <Stack mt={2} direction='row' alignItems='center' gap={0.5}>
              <Place sx={{ color: '#808191' }} />
              <Typography fontSize={14} color='#808191'>Toronto, Ontario, Canada</Typography>

            </Stack>
            <Typography mt={2}>{`${propertyDetails.creator.allProperties.length} Properties`}</Typography>
            <Stack direction='row' gap={2} mt='20px'>
              <CustomButton
                title={isCurrentUser ? "Edit" : "Message"}
                handleClick={() => { 
                  if (isCurrentUser){
                    navigate(
                      `/properties/edit/${propertyDetails._id}`
                    )
                  }

                }}
                backgroundColor='#475be8'
                color="#fcfcfc"
                icon={isCurrentUser ? <Edit /> : <ChatBubble />}
              />
              <CustomButton
                title={isCurrentUser ? "Delete" : "Call"}
                handleClick={() => { if (isCurrentUser){ handleDeleteProperty() }}}
                backgroundColor={isCurrentUser ? '#db0000' : '#21bd02'}
                color="#fcfcfc"
                icon={isCurrentUser ? <Delete /> : <Phone />}
              />

            </Stack>
          </Box>
          <Box>
            <img src={map} alt="image" width={300} style={{
              marginTop: '30px',
              objectFit: 'cover',
              borderRadius: '10px'
            }} />
            <Box width='100%' marginBottom='10px'>
              <CustomButton
                title="Book Now"
                handleClick={() => { }}
                backgroundColor='#475be8'
                color="#fcfcfc"
                fullWidth

              />

            </Box>
          </Box>
        </Box>

      </Box>
    </>
  )
}

export default PropertyDetails