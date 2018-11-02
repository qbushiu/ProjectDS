var commentsApp = new Vue({
	el: '#aggregatorDiv',
	data : {
		images: {
				he: "images/he.jpg",
				pte: "images/pte.jpg"
			},
		clientInfo: [
			{
				clientId: '',
        clientName: '',
        clientDescription: '',
        gicsSector: '',
        gicsSubIndustry: '',
        headquarters: ''
			}
		],
		sites: [
			{
				siteId: '',
				clientId: '',
				siteName: '',
				siteDescription: '',
				primaryContact: '',
				capacity: ''
			}
		],
			sensorTimeSeries: [
				{
	        sensorDeployedId: '',
	        dataCollectedDate: '',
	        output: '',
	        heartRate: '',
	        compressorEfficiency: '',
	        availability: '',
	        reliability: '',
	        firedHours: '',
	        trips: '',
	        starts: ''
    		}
			],
			turbineDeployedSpecific:[
			{
					turbineDeployedId: '',
					turbineId: '',
					siteId: '',
					serialNumber: '',
					deployedDate: '',
					totalFiredHours: '',
					totalStarts: '',
					lastPlannedOutageDate: '',
					lastUnplannedOutageDate: ''
			}
		],
			turbineDeployed: [
	    {
	        turbineDeployedId: '',
	        turbineId: '',
	        siteId: '',
	        serialNumber: '',
	        deployedDate: '',
	        totalFiredHours: '',
	        totalStarts: '',
        	lastPlannedOutageDate: '',
        	lastUnplannedOutageDate: ''
    	}
		],
		comments: [
    	{
        noteId: '',
        notes: '',
        clientId: ''
    	}
		],
			testLorem: 'Test Lorem Ipsum Dolor',
			plannedOutageDiff: '',
			unplannedOutageDiff: ''
		},
	  methods: {
			fetchCientInfo() {
				// console.log(document.getElementById("feedbackComment").value);
	      fetch('http://ec2-13-233-94-247.ap-south-1.compute.amazonaws.com/api/client.php')
	      .then(response => response.json())
	      .then (json => {
					commentsApp.clientInfo = json;
					console.log(commentsApp.clientInfo);
				})
	      .catch( function(err){
	        console.log(err)
	      })
	    },
			fetchSitesInfo() {
				// console.log(document.getElementById("feedbackComment").value);
	      fetch('http://ec2-13-233-94-247.ap-south-1.compute.amazonaws.com/api/site.php')
	      .then(response => response.json())
	      .then (json => {
					commentsApp.sites = json;
					console.log(commentsApp.sites);
				})
	      .catch( function(err){
	        console.log(err)
	      })
	    },
			fetchSensorTimeSeries() {
				// console.log(document.getElementById("feedbackComment").value);
	      fetch('http://ec2-13-233-94-247.ap-south-1.compute.amazonaws.com/api/sensorTimeSeries.php')
	      .then(response => response.json())
	      .then (json => {
					commentsApp.sensorTimeSeries = json;
					this.formatSensorTime();
					if (document.getElementById("mainAvailabilityChart")) {
						this.buildAvailabilityChart();
					}
					this.buildSensorAvailability();
					this.buildSensorHeatRate();
					this.buildSensorReliability();
					this.buildSensorTrips();
					this.buildSensorStarts();
					this.buildSensorEfficiency();
					console.log("MAPPED DATA!:", this.sensorTimeSeries.map( entry => [entry.dateCollected, entry.availability]));
				})
	      .catch( function(err){
	        console.log(err)
	      })
	    },
			fetchAllTurbinesData() {
				fetch('http://ec2-13-233-94-247.ap-south-1.compute.amazonaws.com/api/turbineDeployed.php')
	      .then(response => response.json())
	      .then (json => {
					commentsApp.turbineDeployed = json;
					console.log(commentsApp.turbineDeployed);
				})
	      .catch( function(err){
	        console.log(err)
	      })
			},
			fetchSpecificTurbinesData(siteId) {
				fetch('http://ec2-13-233-94-247.ap-south-1.compute.amazonaws.com/api/turbineDeployed.php?turbineDeployedId='+siteId)
	      .then(response => response.json())
	      .then (json => {
					commentsApp.testLorem = "Changed lorem ipsum dolor";
					commentsApp.turbineDeployedSpecific = json;
					commentsApp.plannedOutageDiff = calcTimeDiff(commentsApp.turbineDeployedSpecific[0].lastPlannedOutageDate);
					commentsApp.unplannedOutageDiff = calcTimeDiff(commentsApp.turbineDeployedSpecific[0].lastUnplannedOutageDate)
					console.log(commentsApp.turbineDeployedSpecific);
				})
	      .catch( function(err){
	        console.log(err)
	      })
			},
			addClientComment() {
			  fetch('http://ec2-13-233-94-247.ap-south-1.compute.amazonaws.com/api/clientNotes.php', {
			      body : JSON.stringify({

			          "clientId": document.getElementById("clientId").value,
			          "notes": document.getElementById("comment").value

			      }),
			      // mode: "no-cors", // no-cors, cors, *same-origin
			      headers: {
			        'Accept': 'application/json, text/plain, */*',
			        'Content-Type': 'application/json; charset=utf-8'
			      },
			      method: "POST"
			    }
			  )
			  .then(function(resp) {
			    console.log(resp.json());
			    // console.log(document.getElementById("comment").value);
			    // plotAvailability();
			  })
			  .catch( function(err){
			    console.log(err)
			  })
			},
			fetchClientComments() {
				fetch('http://ec2-13-233-94-247.ap-south-1.compute.amazonaws.com/api/clientNotes.php?clientId=2')
	      .then(response => response.json())
	      .then (json => {
					commentsApp.comments = json;
					console.log(commentsApp.comments);
				})
	      .catch( function(err){
	        console.log(err)
	      })
			},
			formatSensorTime(){
				this.sensorTimeSeries.forEach(
				(entry, index, arr) => {
					entry.dataCollectedDate = entry.dataCollectedDate;
					entry.output = Number(entry.output);
					entry.heatRate = Number(entry.heartRate);
					entry.compressorEfficiency = Number(entry.compressorEfficiency);
					entry.availability = Number(entry.availability);
					entry.reliability = Number(entry.reliability);
					entry.fixedHours = Number(entry.firedHours);
					entry.trips = Number(entry.trips);
					entry.starts = Number(entry.starts);
				})
			},
			buildAvailabilityChart(){
        Highcharts.chart('mainAvailabilityChart', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Availability for sensor 2'
            },
            yAxis: {
                title: {
                    text: 'Availability %'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 1,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[3]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'Availability %',
								// data: [[1,55],[2,56],[3,67],[4,89]]
                data: this.sensorTimeSeries.map( entry => [entry.dataCollectedDate, entry.availability])
            }]
        });
			},
			buildSensorAvailability(){
        Highcharts.chart('sensorAvailabilityChart', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Availability for sensor 2'
            },
            yAxis: {
                title: {
                    text: 'Availability %'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1.3
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'Availability %',
								// data: [[1,55],[2,56],[3,67],[4,89]]
                data: this.sensorTimeSeries.map( entry => [entry.dataCollectedDate.toString(), entry.availability])
            }]
        });
			},
			buildSensorReliability(){
        Highcharts.chart('sensorReliabilityChart', {
    yAxis: {
        min: 95,
				max: 100
    },
    title: {
        text: 'Reliability'
    },
    series: [{
        type: 'line',
        name: 'Regression Line',
        data: [[0, 98], [150, 98.5]],
        marker: {
            enabled: false
        },
        states: {
            hover: {
                lineWidth: 0
            }
        },
        enableMouseTracking: false
    }, {
        type: 'scatter',
        name: 'Observations',
        data: this.sensorTimeSeries.map( entry => entry.reliability),
        marker: {
            radius: 4
        }
    }]
});
			},
			buildSensorEfficiency(){
        Highcharts.chart('sensorEfficiencyChart', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Compressor Efficiency for sensor 2'
            },
            yAxis: {
                title: {
                    text: 'Availability %'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1.3
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'Availability %',
								// data: [[1,55],[2,56],[3,67],[4,89]]
                data: this.sensorTimeSeries.map( entry => [entry.dataCollectedDate.toString(), entry.compressorEfficiency])
            }]
        });
			},
			buildSensorStarts(){
        Highcharts.chart('sensorStartsChart', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Starts for sensor 2'
            },
            yAxis: {
                title: {
                    text: 'Availability %'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1.4
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'Availability %',
								// data: [[1,55],[2,56],[3,67],[4,89]]
                data: this.sensorTimeSeries.map( entry => [entry.dataCollectedDate.toString(), entry.starts])
            }]
        });
			},
			buildSensorTrips(){
        Highcharts.chart('sensorTripsChart', {
    chart: {
        type: 'scatter',
        zoomType: 'xy'
    },
    title: {
        text: 'Starts and Trips for sensor 2'
    },
    xAxis: {
        title: {
            enabled: true,
            text: 'Date'
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'Number'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 100,
        y: 70,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
        borderWidth: 1
    },
    plotOptions: {
        scatter: {
            marker: {
                radius: 5,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x} had {point.y} {series.name} '
            }
        }
    },
    series: [{
        name: 'Starts',
        color: 'rgba(223, 83, 83, .5)',
        data:  this.sensorTimeSeries.map( entry => [entry.dataCollectedDate.toString(), entry.starts]) }, {
        name: 'Trips',
        color: 'rgba(119, 152, 191, .5)',
        data: this.sensorTimeSeries.map( entry => [entry.dataCollectedDate.toString(), entry.trips])
    }]
});
			},
			buildSensorHeatRate(){
        Highcharts.chart('sensorHeatRateChart', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'HeatRate'
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -90,
            style: {
                fontSize: '8px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'HeatRate'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'HeatRate: <b>{point.y:.1f}</b>'
    },
    series: [{
        name: 'sensorHeatRate',
        data: this.sensorTimeSeries.map( entry => [entry.dataCollectedDate.toString(), entry.heatRate]),
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '6px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
});
			}
	  },
		created() {
			this.formatSensorTime();
			this.fetchSensorTimeSeries();
			this.fetchAllTurbinesData();
			this.fetchCientInfo();
			this.fetchSitesInfo();
			this.fetchClientComments();
			//todo: add chart builder call
			// this.addComment();
			// this.checkData();
		}
	})

	function calcTimeDiff(date){
		given = moment(date, "YYYY-MM-DD");
		current = moment().startOf('day');
		diff = moment.duration(given.diff(current)).asDays();
		return diff+" days ago";
	}
