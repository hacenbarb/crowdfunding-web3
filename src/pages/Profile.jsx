import React, {useState, useEffect} from 'react'
import { useStateContext } from '../contexts';
import { DisplayCampaigns } from '../components';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const {address, contract, getUserCampaigns} = useStateContext();
  async function fetchCampaigns() {
    const data = await getUserCampaigns();
    setCampaigns(data);
  }
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setIsLoading(true)
    if(contract && signal) {
      fetchCampaigns()
    }
    setIsLoading(false)
    return (() => {
      controller.abort()
    });
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