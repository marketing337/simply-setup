// Cache clearing utilities for development and manual cache management
export const clearAllCaches = () => {
  try {
    // Clear localStorage cache
    const keysToRemove = [
      'bootstrap_cache',
      'saved_location',
      'app_cache',
      'location_cache'
    ];
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Force reload to clear in-memory caches
    window.location.reload();
    
    console.log('All caches cleared successfully');
    return true;
  } catch (error) {
    console.error('Failed to clear caches:', error);
    return false;
  }
};

export const clearBootstrapCache = () => {
  try {
    localStorage.removeItem('bootstrap_cache');
    console.log('Bootstrap cache cleared');
    return true;
  } catch (error) {
    console.error('Failed to clear bootstrap cache:', error);
    return false;
  }
};

export const clearLocationCache = () => {
  try {
    localStorage.removeItem('saved_location');
    localStorage.removeItem('location_cache');
    console.log('Location cache cleared');
    return true;
  } catch (error) {
    console.error('Failed to clear location cache:', error);
    return false;
  }
};