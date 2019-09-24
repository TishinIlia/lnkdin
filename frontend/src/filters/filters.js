import Vue from 'vue'
import { format } from 'date-fns'

Vue.filter('date', value => typeof value === 'number' ? format(new Date(value), 'MM/dd/yyyy') : ''
)
