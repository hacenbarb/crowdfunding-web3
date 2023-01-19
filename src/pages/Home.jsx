import React, {useState, useEffect} from 'react'
import { useStateContext } from '../contexts';
import { DisplayCampaigns } from '../components';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const {address, contract, getCampaigns} = useStateContext();
  async function fetchCampaigns() {
    const data = await getCampaigns();
    setCampaigns(data);
  }
  useEffect(() => {
    if(contract) {
      setIsLoading(true)
      fetchCampaigns()
      setIsLoading(false)
    }
  },[contract, address])
  return (
    <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Home