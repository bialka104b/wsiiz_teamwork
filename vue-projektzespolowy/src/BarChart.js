import { defineComponent, h } from "vue";
import { Bar } from "vue-chartjs";
import {
    Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
} from "chart.js";
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default defineComponent({
	name: "BarChart",
	components: {
		Bar,
	},
	props: {
		product: {
			type: Object,
		},
		value: {
			type: Boolean,
		},
		chartId: {
			type: String,
			default: "bar-chart",
		},
		datasetIdKey: {
			type: String,
			default: "label",
		},
		width: {
			type: Number,
			default: 100,
		},
		height: {
			type: Number,
			default: 100,
		},
		cssClasses: {
			default: "",
			type: String,
		},
		styles: {
			type: Object,
			default: () => {},
		},
		plugins: {
			type: Object,
			default: () => {},
		},
	},
	setup(props) {
		const chartData = props.chartData;
		const chartOptions = props.chartOptions;
		return () =>
			h(Bar, {
				chartData,
				chartOptions,
				chartId: props.chartId,
				width: props.width,
				height: props.height,
				cssClasses: props.cssClasses,
				styles: props.styles,
				plugins: props.plugins,
			});
	},
});
