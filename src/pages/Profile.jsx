import React, {useState, useEffect} from 'react'
import { useStateContext } from '../contexts';
import { DisplayCampaigns } from '../components';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const {address, contract, getUserCampaigns} = useStateContext();
  async function fetchCampaigns() {
    const data = await getUserCampaigns();
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
      title="My Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Profile