const BASE_URL = 'http://localhost:3000/api';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhOTUyN2U1ZTQ4Y2JmOGFkZTA2ZTFlMiIsImlhdCI6MTc4ODE2MjE1OCwiZXhwIjoxNzg4MjQ4NTU4fQ.yNJD0RkYAMRRBnCVp1iDdLJ10WByJvz6bI6UMTfrrbE';

// Step 1: Create a new Post
const createPost = async () => {
  console.log('\n--- 1. Testing Create Post ---');
  const postData = {
    postType: 'lost',
    itemName: 'Student ID Card',
    category: 'id_card',
    location: 'library',
    itemDate: '2026-08-30T10:00:00',
    description: 'Lost my ID card near library entrance',
    contactEmail: 'test@student.edu',
    contactPhone: '01700000000',
    isContactPublic: true
  };

  const res = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`
    },
    body: JSON.stringify(postData)
  });

  const data = await res.json();
  console.log('Status Code:', res.status);
  console.log('Response:', JSON.stringify(data, null, 2));

  return data.post?.id;
};

// Step 2: Update the created Post
const updatePost = async (postId) => {
  console.log(`\n--- 2. Testing Update Post (ID: ${postId}) ---`);
  const updateData = {
    itemName: 'Updated Student ID Card',
    description: 'Lost near 2nd floor library entrance, blue ribbon attached.'
  };

  const res = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`
    },
    body: JSON.stringify(updateData)
  });

  const data = await res.json();
  console.log('Status Code:', res.status);
  console.log('Response:', JSON.stringify(data, null, 2));
};

// Step 3: Delete the Post
const deletePost = async (postId) => {
  console.log(`\n--- 3. Testing Delete Post (ID: ${postId}) ---`);
  const res = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${TOKEN}`
    }
  });

  const data = await res.json();
  console.log('Status Code:', res.status);
  console.log('Response:', JSON.stringify(data, null, 2));
};

// Run all test cases sequentially
const runAllTests = async () => {
  try {
    const createdPostId = await createPost();

    if (createdPostId) {
      await updatePost(createdPostId);
      await deletePost(createdPostId);
    }
    console.log('\nAll Post Controller tests executed successfully.');
  } catch (error) {
    console.error('Test execution failed:', error.message);
  }
};

runAllTests();