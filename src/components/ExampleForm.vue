<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="4">
        <h1 justify-center="true">Example form</h1>
        <v-form
          id="exampleForm"
          ref="form"
          v-model="isFormValid"
          lazy-validation
          @submit.prevent="onSubmit"
        >
          <v-text-field
            id="txtName"
            v-model="data.name"
            data-testid="txtName"
            required
          ></v-text-field>
          <v-btn
            id="btnSubmit"
            :disabled="!isFormValid"
            color="blue"
            type="submit"
          >
            Save
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { reactive, ref } from "vue"

  const isFormValid = ref<boolean>()
  const data = reactive({})


  const onSubmit = (): Promise<void> => {
    console.log("## onSubmit ##  ", data)
    return fetch("http://localhost:4000/posts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then()
  }
</script>
