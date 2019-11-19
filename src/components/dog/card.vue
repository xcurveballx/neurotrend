<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                {{ dog.name }}
            </p>
        </header>
        <div v-if="dog.photo" class="card-image">
            <figure class="image">
                <img :src="dog.photo" :alt="dog.name">
            </figure>
        </div>
        <div class="card-content">
            <div class="content">
                <ul>
                    <li>
                        Kind: {{ dog.kind }}
                    </li>
                    <li>
                        Birthday: {{ dog.birth_time | formatDateRU }}
                    </li>
                    <li>
                        Registered: {{ dog.reg_time | formatDateTimeRU }}
                    </li>
                    <li>
                        Trustee: {{ trustee }}
                    </li>
                </ul>
            </div>
        </div>
        <footer class="card-footer">
            <p class="card-footer-item">
                <btn @click.native="toggleEdit" class="is-success">Edit</btn>
            </p>
            <p class="card-footer-item">
                <btn @click.native="remove" class="is-danger">Delete</btn>
            </p>
        </footer>
    </div>
</template>

<script>
import EventBus from '@/bus';

export default {
    name: "DogCard",
    computed: {
        trustee: function () {
            return this.dog.trustee ? this.dog.trustee.fio : 'not assigned';
        }
    },
    props: {
        model: {
            required: true,
            type: String
        },
        id: {
            required: true,
            type: String
        },
        dog: {
            required: true,
            type: Object
        }
    },
    methods: {
        toggleEdit () {
            EventBus.$emit('TOGGLE_EDIT_MODE');
        },
        remove () {
            let ans = window.confirm("Are you sure that you want to delete this item?");
            if (ans) {
                let payload = {};
                payload.model = this.model;
                payload.id = this.id;
                EventBus.$emit('REMOVE_MODEL_BY_ID', payload);
            }
        }
    }
};
</script>
