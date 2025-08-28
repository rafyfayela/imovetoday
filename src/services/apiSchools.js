import { supabase } from './supabase';

export const getSchools = async () => {
  const { data, error } = await supabase.from('schools').select('*');

  if (error) {
    console.error('Error fetching schools:', error);
    throw new Error('No Schools Found');
  }

  //console.log("Raw response:", { data, error })
  return data;
};

// Get one school by ID
export async function getSchoolById(id) {
  const { data, error } = await supabase
    .from('schools')
    .select('*')
    .eq('id', id) // filter by id
    .single(); // ensures only one row is returned

  if (error) {
    console.error('Error fetching school:', error);
    throw new Error(error.message);
  }
  // console.log("Raw response:", { data, error })
  return data;
}
