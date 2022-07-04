/**
 * @vitest-environment happy-dom
 */

import { Pact } from '@pact-foundation/pact'
import { afterEach, describe, expect } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { flushPromises, mount } from '@vue/test-utils'
import ExampleForm from '../../src/components/ExampleForm.vue'
import path from 'path';
import { nextTick } from 'vue';


const provider = new Pact({
    consumer: 'consumer',
    provider: 'producer',
    port: 4000,
    log: path.resolve(process.cwd(), 'pact/logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'pact/pacts'),
    logLevel: 'debug',
})

const vuetify = createVuetify({components, directives})

describe('Example posts', async () => {
    beforeAll(async () => {
        await provider.setup()
    })

    it('Should do one post', async () => {
        await provider.addInteraction({
            state: 'Post does not exist',
            uponReceiving: 'Post something',
            withRequest: {
                method: 'POST',
                path: `/posts`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    name: 'test'
                },
            },
            willRespondWith: {
                status: 204,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        })

        const wrapper = mount(ExampleForm, {
            attachTo: document.body, // or '#root'
            global: {
                plugins: [vuetify],
            },
        })

        expect(wrapper.vm.$el.parentNode).not.toBeNull()

        await wrapper.find('#txtName').setValue('test')
        await wrapper.find('#exampleForm').trigger('submit.prevent')
        // await wrapper.vm.onSubmit()
    })

    afterEach(async () => {
        await nextTick()
        await flushPromises()
        await sleep(2000) // either this or line 65 needs to be uncommented for the test to pass
        await provider.verify()
    })

    afterAll(async () => {
        await provider.finalize()
    })
})

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
