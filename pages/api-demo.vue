<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">API Management Demo</h1>
    
    <div class="mb-6 flex gap-4 items-center">
      <div class="flex items-center gap-2">
        <label>Search:</label>
        <input 
          v-model="search" 
          placeholder="Search users..." 
          class="border p-2 rounded" 
        />
      </div>
      
      <div class="flex items-center gap-2">
        <button 
          @click="page--" 
          :disabled="page <= 1" 
          class="border px-3 py-1 rounded disabled:opacity-50 hover:bg-gray-100"
        >
          Prev
        </button>
        <span>Page {{ page }}</span>
        <button 
          @click="page++" 
          class="border px-3 py-1 rounded hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>

    <div v-if="pending" class="text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-red-500">
      Error: {{ error.message }}
    </div>
    <div v-else class="border rounded-lg overflow-hidden">
      <table class="w-full text-left">
        <thead class="bg-gray-50">
          <tr>
            <th class="p-3">ID</th>
            <th class="p-3">Name</th>
            <th class="p-3">Email</th>
            <th class="p-3">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in data?.items" :key="user.id" class="border-t hover:bg-gray-50">
            <td class="p-3">{{ user.id }}</td>
            <td class="p-3">{{ user.name }}</td>
            <td class="p-3">{{ user.email }}</td>
            <td class="p-3">{{ user.role }}</td>
          </tr>
        </tbody>
      </table>
      <div class="p-3 bg-gray-50 text-right text-sm text-gray-500">
        Total: {{ data?.total }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = useRepository()

const page = ref(1)
const search = ref('')

// useFetch is reactive because we pass refs in the query object
const { data, pending, error } = await user.getUsers({
  page,
  q: search,
  itemsPerPage: 5
})
</script>
