// Create new workspaces using native fetch
const createWorkspaces = async () => {
  try {
    // 1. Awfis Aundh workspace
    const aundhData = {
      name: "Awfis Aundh",
      slug: "awfis-aundh", 
      description: "Awfis Aundh provides premium virtual office space in one of Pune's most vibrant neighborhoods. Ideal for startup registrations and established businesses looking for a prestigious address.",
      locationId: 7,
      areaId: 2,
      address: "Vascon Business Hub, Aundh, Pune 411007",
      mapCoordinates: "18.5585,73.8074",
      monthlyPrice: 699.00,
      amenities: [
        "WiFi",
        "Air Conditioning",
        "Reception Services",
        "Mail Handling",
        "Meeting Rooms"
      ],
      features: [
        "Prime Location",
        "24/7 access",
        "GST Registration",
        "Business Center"
      ],
      images: [
        "https://cdn.shopify.com/s/files/1/0704/3704/4519/files/awfis-virtual-office.jpg?v=1745941400"
      ],
      contactPhone: "+91 20 4123 5678",
      isActive: true
    };
    
    const aundhResponse = await fetch('http://localhost:5000/api/workspaces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aundhData),
    });
    
    if (aundhResponse.ok) {
      const aundhResult = await aundhResponse.json();
      console.log('Aundh workspace created:', aundhResult);
    } else {
      console.error('Failed to create Aundh workspace:', aundhResponse.status, await aundhResponse.text());
    }
    
    // 2. Awfis Viman Nagar workspace
    const vimanNagarData = {
      name: "Awfis Viman Nagar",
      slug: "awfis-viman-nagar", 
      description: "Awfis Viman Nagar offers a premium business address near the airport with all amenities needed for professional virtual office space. Perfect for businesses requiring a prestigious Pune address for GST registration.",
      locationId: 7,
      areaId: 3,
      address: "Phoenix Marketcity, Viman Nagar, Pune 411014",
      mapCoordinates: "18.5628,73.9170",
      monthlyPrice: 699.00,
      amenities: [
        "WiFi",
        "Air Conditioning",
        "Reception Services",
        "Mail Handling",
        "Meeting Rooms",
        "Business Address"
      ],
      features: [
        "Airport Proximity",
        "24/7 access",
        "GST Registration",
        "Mall Location"
      ],
      images: [
        "https://cdn.shopify.com/s/files/1/0704/3704/4519/files/awfis-workspace.jpg?v=1745941525"
      ],
      contactPhone: "+91 20 4123 5678",
      isActive: true
    };
    
    const vimanNagarResponse = await fetch('http://localhost:5000/api/workspaces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vimanNagarData),
    });
    
    if (vimanNagarResponse.ok) {
      const vimanNagarResult = await vimanNagarResponse.json();
      console.log('Viman Nagar workspace created:', vimanNagarResult);
    } else {
      console.error('Failed to create Viman Nagar workspace:', vimanNagarResponse.status, await vimanNagarResponse.text());
    }
    
    // Verify all workspaces
    const response = await fetch('http://localhost:5000/api/workspaces');
    if (response.ok) {
      const workspaces = await response.json();
      console.log('All workspaces:', workspaces.map(w => `${w.id}: ${w.name} (${w.slug})`));
    } else {
      console.error('Failed to fetch workspaces:', response.status);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

createWorkspaces();