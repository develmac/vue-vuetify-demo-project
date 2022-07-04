/**
 * @vitest-environment happy-dom
 */

import { afterEach, describe, expect } from "vitest"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import { flushPromises, mount } from "@vue/test-utils"
import ExampleForm from "../../src/components/ExampleForm.vue"


const vuetify = createVuetify({ components, directives })

describe("Example posts", async () => {


  it("Should do one post", async () => {

    const div = document.createElement('div')
    div.id = 'root'
    document.body.appendChild(div)

    const wrapper = mount(ExampleForm, {
      attachTo: document.body, // or '#root'
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.vm.$el.parentNode).not.toBeNull()

    await wrapper.find("#txtName").setValue("name")
    await wrapper.find("#btnSubmit").trigger("click")
  })

})
