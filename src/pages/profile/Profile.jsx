import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import { supabase } from "../../services/supabase";
import { useAuthContext } from "../../../Provider/AuthProvider";
import styles from "./Profile.module.css";

// Helper function to filter out unwanted keys for display
const filterDisplayData = (data, excludeKeys = []) => {
  if (!data) return {};
  const filtered = {};
  for (const key in data) {
    if (!excludeKeys.includes(key)) {
      filtered[key] = data[key];
    }
  }
  return filtered;
};

const Profile = () => {
  const { profile: userData, loading } = useAuthContext();
  const [children, setChildren] = useState([]);
  const [preferences, setPreferences] = useState(null);
  const [workplace, setWorkplace] = useState(null); // Changed to single object
  const [loadingData, setLoadingData] = useState(true);

  // State to manage edit mode for different sections
const [editMode, setEditMode] = useState({
  user: false,
  children: false,
  preferences: false,
});

  useEffect(() => {
    const fetchData = async () => {
      if (!userData) return;
      setLoadingData(true);

      // Fetch Children
      const { data: kids, error: childrenError } = await supabase
        .from("children")
        .select("*")
        .eq("user_id", userData.id);
      if (childrenError) console.error("Error fetching children:", childrenError.message);
      setChildren(kids || []);

      // Fetch Preferences
      const { data: prefs, error: preferencesError } = await supabase
        .from("user_preferences")
        .select("*")
        .eq("user_id", userData.id)
        .single();
      if (preferencesError && preferencesError.code !== 'PGRST116') console.error("Error fetching preferences:", preferencesError.message); // PGRST116 is 'No rows found'
      setPreferences(prefs);

      // Fetch Workplace if preferences exist
      if (prefs?.workplace_id) {
        const { data: work, error: workplaceError } = await supabase
          .from("workplaces")
          .select("*")
          .eq("id", prefs.workplace_id)
          .single();
        if (workplaceError) console.error("Error fetching workplace:", workplaceError.message);
        setWorkplace(work); // Set as a single object
      }

      setLoadingData(false);
    };

    fetchData();
  }, [userData]);

  // Handle saving user data (for the main user profile card)
  const handleSaveUser = async (updatedFields) => {
    console.log("Saving user data:", updatedFields);
    // Example Supabase update (replace with your actual update logic)
    const { error } = await supabase
      .from("profiles") // Assuming your user data is in a 'profiles' table
      .update(updatedFields)
      .eq("id", userData.id);

    if (error) {
      console.error("Error updating user data:", error.message);
      alert("Failed to update user data.");
    } else {
      // Optimistically update local state or re-fetch user data
      // For now, let's just log and turn off edit mode
      console.log("User data updated successfully!");
      setEditMode((prev) => ({ ...prev, user: false }));
      // You might want to refresh the auth context user data here
    }
  };

  // Handle saving children data
  const handleSaveChild = async (childId, updatedFields) => {
    console.log(`Saving child ${childId} data:`, updatedFields);
    const { error } = await supabase
      .from("children")
      .update(updatedFields)
      .eq("id", childId);

    if (error) {
      console.error("Error updating child data:", error.message);
      alert("Failed to update child data.");
    } else {
      console.log("Child data updated successfully!");
      // Update local state for children
      setChildren((prev) =>
        prev.map((child) => (child.id === childId ? { ...child, ...updatedFields } : child))
      );
      setEditMode((prev) => ({ ...prev, children: false }));
    }
  };

  // Handle saving preferences data
  const handleSavePreferences = async (updatedFields) => {
    console.log("Saving preferences data:", updatedFields);
    const { error } = await supabase
      .from("user_preferences")
      .update(updatedFields)
      .eq("user_id", userData.id);

    if (error) {
      console.error("Error updating preferences data:", error.message);
      alert("Failed to update preferences.");
    } else {
      console.log("Preferences updated successfully!");
      // Update local state for preferences
      setPreferences((prev) => ({ ...prev, ...updatedFields }));
      setEditMode((prev) => ({ ...prev, preferences: false }));
    }
  };

  if (loading || loadingData) return <p className={styles.loadingText}>Loading profile...</p>;

  // Filter user data for display in the main card
  const filteredUserData = filterDisplayData(userData, [
    "id",
    "email",
    "photo_url", // avatar_url is used, photo_url might be an old field
    "avatar_url", // Handled separately in header
    "created_at",
    "user_id", // In case it accidentally gets passed as top-level
    "family_size" // Keep it if you intend to populate, otherwise exclude
  ]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Profile</h1>

      {/* Profile Header */}
      <div className={styles.profileHeader}>
        <img
          src={userData.avatar_url || "/default-avatar.png"}
          alt="Profile"
          className={styles.avatar}
        />
        <div className={styles.profileInfo}>
          <h2 className={styles.profileName}>{userData.full_name}</h2>
          <p className={styles.profileDetail}>{userData.nationality}</p>
        </div>
        {/* Global Edit Button for the entire profile, or can be removed if section edits are preferred */}
        {/* <button className={styles.editProfileButton}>Edit Profile</button> */}
      </div>

      {/* User Information */}
      <ProfileCard
        title="User Information"
        data={filteredUserData}
        editable={editMode.user}
        onEditToggle={() => setEditMode(prev => ({ ...prev, user: !prev.user }))}

        onSave={handleSaveUser}
        excludedKeys={["id", "email", "avatar_url", "created_at", "user_id"]} // Explicitly exclude
      />

      {/* Children */}
      {children.length > 0 && (
        <ProfileCard
          title="Children"
          data={children.map(child => filterDisplayData(child, ["id", "user_id", "created_at"]))} // Filter children data
          editable={editMode.children}
          onEditToggle={() => setEditMode(prev => ({ ...prev, user: !prev.user }))}
          onSave={(updatedFields, originalItem) => handleSaveChild(originalItem.id, updatedFields)}
          isMultiItem={true} // Indicate that this card handles an array of items
          originalData={children} // Pass original children data for saving individual children
          // Custom render for children data to display like "Akez Noah (6, Grade 1)"
          customRender={(child) => (
            <>
              <span className={styles.childName}>{child.full_name}</span>
              <span className={styles.childDetails}>({child.age}, {child.current_grade})</span>
            </>
          )}
          excludedKeys={["id", "user_id", "created_at"]} // Explicitly exclude for display in EditMode
        />
      )}

      {/* Preferences */}
      {preferences && (
        <ProfileCard
          title="Preferences"
          data={{
            Budget: `${preferences.budget_min} - ${preferences.budget_max}`,
            Workplace: workplace?.name || "Not selected",
          }}
          editable={editMode.preferences}
          onEditToggle={() => setEditMode(prev => ({ ...prev, user: !prev.user }))}
          onSave={handleSavePreferences}
          excludedKeys={["id", "user_id"]} // Exclude internal preference IDs
        />
      )}
    </div>
  );
};

export default Profile;