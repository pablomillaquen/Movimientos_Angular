/*The MIT License (MIT)

Copyright (c) 2014 https://github.com/kayalshri/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.*/

(function($){
        $.fn.extend({
            tableExport: function(options) {
                var defaults = {
						separator: ',',
						ignoreColumn: [],
						tableName:'table',
						type:'csv',
						pdfFontSize:12,
						pdfLeftMargin:20,
						escape:'true',
						htmlContent:'false',
						consoleLog:'false'
				};

				var options = $.extend(defaults, options);
				var el = this;

				if(defaults.type == 'csv' || defaults.type == 'txt'){

					// Header
					var tdData ="";
					$(el).find('thead').find('tr').each(function() {
					tdData += "\n";
						$(this).filter(':visible').find('th').each(function(index,data) {
							if ($(this).css('display') != 'none'){
								if(defaults.ignoreColumn.indexOf(index) == -1){
									tdData += '"' + parseString($(this)) + '"' + defaults.separator;
								}
							}

						});
						tdData = $.trim(tdData);
						tdData = $.trim(tdData).substring(0, tdData.length -1);
					});

					// Row vs Column
					$(el).find('tbody').find('tr').each(function() {
					tdData += "\n";
						$(this).filter(':visible').find('td').each(function(index,data) {
							if ($(this).css('display') != 'none'){
								if(defaults.ignoreColumn.indexOf(index) == -1){
									tdData += '"'+ parseString($(this)) + '"'+ defaults.separator;
								}
							}
						});
						//tdData = $.trim(tdData);
						tdData = $.trim(tdData).substring(0, tdData.length -1);
					});

					//output
					if(defaults.consoleLog == 'true'){
						console.log(tdData);
					}
					var base64data = "base64," + $.base64.encode(tdData);

					var doc = document.createElement("a");
					doc.target = '_blank';
					doc.download = defaults.tableName+'.'+defaults.type;
					doc.href = 'data:application/'+defaults.type+';filename=exportData;'+base64data;
					doc.click();

				}else if(defaults.type == 'sql'){

					// Header
					var tdData ="INSERT INTO `"+defaults.tableName+"` (";
					$(el).find('thead').find('tr').each(function() {

						$(this).filter(':visible').find('th').each(function(index,data) {
							if ($(this).css('display') != 'none'){
								if(defaults.ignoreColumn.indexOf(index) == -1){
									tdData += '`' + parseString($(this)) + '`,' ;
								}
							}

						});
						tdData = $.trim(tdData);
						tdData = $.trim(tdData).substring(0, tdData.length -1);
					});
					tdData += ") VALUES ";
					// Row vs Column
					$(el).find('tbody').find('tr').each(function() {
					tdData += "(";
						$(this).filter(':visible').find('td').each(function(index,data) {
							if ($(this).css('display') != 'none'){
								if(defaults.ignoreColumn.indexOf(index) == -1){
									tdData += '"'+ parseString($(this)) + '",';
								}
							}
						});

						tdData = $.trim(tdData).substring(0, tdData.length -1);
						tdData += "),";
					});
					tdData = $.trim(tdData).substring(0, tdData.length -1);
					tdData += ";";

					//output
					//console.log(tdData);

					if(defaults.consoleLog == 'true'){
						console.log(tdData);
					}

					var base64data = "base64," + $.base64.encode(tdData);
					window.open('data:application/sql;filename=exportData;' + base64data);


				}else if(defaults.type == 'json'){

					var jsonHeaderArray = [];
					$(el).find('thead').find('tr').each(function() {
						var tdData ="";
						var jsonArrayTd = [];

						$(this).filter(':visible').find('th').each(function(index,data) {
							if ($(this).css('display') != 'none'){
								if(defaults.ignoreColumn.indexOf(index) == -1){
									jsonArrayTd.push(parseString($(this)));
								}
							}
						});
						jsonHeaderArray.push(jsonArrayTd);

					});

					var jsonArray = [];
					$(el).find('tbody').find('tr').each(function() {
						var tdData ="";
						var jsonArrayTd = [];

						$(this).filter(':visible').find('td').each(function(index,data) {
							if ($(this).css('display') != 'none'){
								if(defaults.ignoreColumn.indexOf(index) == -1){
									jsonArrayTd.push(parseString($(this)));
								}
							}
						});
						jsonArray.push(jsonArrayTd);

					});

					var jsonExportArray =[];
					jsonExportArray.push({header:jsonHeaderArray,data:jsonArray});

					//Return as JSON
					//console.log(JSON.stringify(jsonExportArray));

					//Return as Array
					//console.log(jsonExportArray);
					if(defaults.consoleLog == 'true'){
						console.log(JSON.stringify(jsonExportArray));
					}
					var base64data = "base64," + $.base64.encode(JSON.stringify(jsonExportArray));
					window.open('data:application/json;filename=exportData;' + base64data);
				}else if(defaults.type == 'xml'){

					var xml = '<?xml version="1.0" encoding="utf-8"?>';
					xml += '<tabledata><fields>';

					// Header
					$(el).find('thead').find('tr').each(function() {
						$(this).filter(':visible').find('th').each(function(index,data) {
							if ($(this).css('display') != 'none'){
								if(defaults.ignoreColumn.indexOf(index) == -1){
									xml += "<field>" + parseString($(this)) + "</field>";
								}
							}
						});
					});
					xml += '</fields><data>';

					// Row Vs Column
					var rowCount=1;
					$(el).find('tbody').find('tr').each(function() {
						xml += '<row id="'+rowCount+'">';
						var colCount=0;
						$(this).filter(':visible').find('td').each(function(index,data) {
							if ($(this).css('display') != 'none'){
								if(defaults.ignoreColumn.indexOf(index) == -1){
									xml += "<column-"+colCount+">"+parseString($(this))+"</column-"+colCount+">";
								}
							}
							colCount++;
						});
						rowCount++;
						xml += '</row>';
					});
					xml += '</data></tabledata>'

					if(defaults.consoleLog == 'true'){
						console.log(xml);
					}

					var base64data = "base64," + $.base64.encode(xml);
					window.open('data:application/xml;filename=exportData;' + base64data);

				}else if(defaults.type == 'excel' || defaults.type == 'doc'|| defaults.type == 'powerpoint'  ){
					//console.log($(this).html());
					var excel="<table>";
					// Header
					$(el).find('thead').find('tr').each(function() {
						excel += "<tr>";
						$(this).filter(':visible').find('th').each(function(index,data) {
							if ($(this).css('display') != 'none'){
								if(defaults.ignoreColumn.indexOf(index) == -1){
									excel += "<td>" + parseString($(this))+ "</td>";
								}
							}
						});
						excel += '</tr>';

					});


					// Row Vs Column
					var rowCount=1;
					$(el).find('tbody').find('tr').each(function() {
						excel += "<tr>";
						var colCount=0;
						$(this).filter(':visible').find('td').each(function(index,data) {
							if ($(this).css('display') != 'none'){
								if(defaults.ignoreColumn.indexOf(index) == -1){
									excel += "<td>"+parseString($(this))+"</td>";
								}
							}
							colCount++;
						});
						rowCount++;
						excel += '</tr>';
					});
					excel += '</table>'

					if(defaults.consoleLog == 'true'){
						console.log(excel);
					}

					var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:"+defaults.type+"' xmlns='http://www.w3.org/TR/REC-html40'>";
					excelFile += "<head>";
					excelFile += "<!--[if gte mso 9]>";
					excelFile += "<xml>";
					excelFile += "<x:ExcelWorkbook>";
					excelFile += "<x:ExcelWorksheets>";
					excelFile += "<x:ExcelWorksheet>";
					excelFile += "<x:Name>";
					excelFile += "{worksheet}";
					excelFile += "</x:Name>";
					excelFile += "<x:WorksheetOptions>";
					excelFile += "<x:DisplayGridlines/>";
					excelFile += "</x:WorksheetOptions>";
					excelFile += "</x:ExcelWorksheet>";
					excelFile += "</x:ExcelWorksheets>";
					excelFile += "</x:ExcelWorkbook>";
					excelFile += "</xml>";
					excelFile += "<![endif]-->";
					excelFile += "</head>";
					excelFile += "<body>";
					excelFile += excel;
					excelFile += "</body>";
					excelFile += "</html>";

					var base64data = "base64," + $.base64.encode(excelFile);
					//window.open('data:application/vnd.ms-'+defaults.type+';filename=exportData.doc;' + base64data);
					var currentTime = new Date();
					var dia = currentTime.getDate();
					var mes = currentTime.getMonth()+1;
					var ano = currentTime.getFullYear();
					var hora = currentTime.getHours();
					var minuto = currentTime.getMinutes();
					var segundo = currentTime.getSeconds();

					if(dia<10) {
					    dia='0'+dia
					} 

					if(mes<10) {
					    mes='0'+mes
					} 

					if(hora<10) {
					    hora='0'+hora
					} 

					if(minuto<10) {
					    minuto='0'+minuto
					} 

					if(segundo<10) {
					    segundo='0'+segundo
					} 

					var Fecha = dia + "/" + mes + "/" + ano + "," + hora + ":" + minuto + ":" + segundo;



					var xls = document.createElement("a");
					xls.target = '_blank';
					xls.download = defaults.tableName+'_'+Fecha+'.xls';
					xls.href = 'data:application/vnd.ms-'+defaults.type+';filename=exportData.doc;'+base64data;
					xls.click();

				}else if(defaults.type == 'png'){
					html2canvas($(el), {
						onrendered: function(canvas) {
							var img = canvas.toDataURL("image/png");
							window.open(img);


						}
					});
				}else if(defaults.type == 'pdf'){
					//Se agregó la variable con los datos de la imagen para el encabezado
					var headerImgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAS4AAACFCAYAAADl7BXaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMDcyNkJFQkVEODdFMjExOTc0RDhEN0FBN0RCMEJDMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5MTZGOEY3QTUyQzUxMUU0QjAxRUIwMTQ4MTQ4QkIwQSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MTZGOEY3OTUyQzUxMUU0QjAxRUIwMTQ4MTQ4QkIwQSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMjdEMjUyMjA0QTZFMjExQjU2REQxMzlFRjk2QkI3NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxMDcyNkJFQkVEODdFMjExOTc0RDhEN0FBN0RCMEJDMCIvPiA8L3JkZjpEZXNjcmlwdGlv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';
					//Se cambio el tipo de hoja de "a4" a "letter"
					var doc = new jsPDF('l','pt', 'a4', true);
					doc.page=1;
					
					doc.setFontSize(defaults.pdfFontSize);
					//doc.setPdfName(defaults.tableName);

					// Header
					//var startColPosition=defaults.pdfLeftMargin;
					var startColPosition=40;
					var y = 0;
					var h = 20
					var pad = 10;
					var textHeight = 40;
					doc.addImage(headerImgData, 'PNG', 5, 5, 110, 30);
					

					$(el).find('thead').find('tr').each(function() {
						$(this).filter(':visible').find('th').each(function(index,data) {
							if ($(this).css('display') != 'none'){
								if(defaults.ignoreColumn.indexOf(index) == -1){
									var colPosition = startColPosition+ (index * 100);
									y += textHeight + pad;
									doc.text(colPosition,60, parseString($(this)));
								}
							}
						});
					});


					// Row Vs Column
					var startRowPosition = 70; var page =1;var rowPosition=0;
					$(el).find('tbody').find('tr').each(function(index,data) {
						rowCalc = index+1;

					if (rowCalc % 26 == 0){
						doc.addPage();
						page++;
						startRowPosition=startRowPosition+10;
					}
					rowPosition=(startRowPosition + (rowCalc * 20)) - ((page -1) * 280);

						$(this).filter(':visible').find('td').each(function(index,data) {
							if ($(this).css('display') != 'none'){
								if(defaults.ignoreColumn.indexOf(index) == -1){
									var colPosition = startColPosition+ (index * 100);
									doc.text(colPosition,rowPosition, parseString($(this)));
								}
							}

						});

					});
					

					function footer(){ 
					    doc.text(20,570, "Sistema Gestión de Máquinas");
					    doc.text(700,570, 'Página ' + doc.page +' de '+doc.internal.getNumberOfPages()); //print number bottom right
					    doc.page ++;
					};
					footer();
					//doc.addImage(headerImgData, 'PNG', 700, 570, 110, 30);
					// Output as Data URI
					//doc.output('datauri');
					var currentTime = new Date();
					var dia = currentTime.getDate();
					var mes = currentTime.getMonth()+1;
					var ano = currentTime.getFullYear();
					var hora = currentTime.getHours();
					var minuto = currentTime.getMinutes();
					var segundo = currentTime.getSeconds();

					if(dia<10) {
					    dia='0'+dia
					} 

					if(mes<10) {
					    mes='0'+mes
					} 

					if(hora<10) {
					    hora='0'+hora
					} 

					if(minuto<10) {
					    minuto='0'+minuto
					} 

					if(segundo<10) {
					    segundo='0'+segundo
					} 

					var Fecha = dia + "/" + mes + "/" + ano + "," + hora + ":" + minuto + ":" + segundo;
        
					doc.save(defaults.tableName + '_' + Fecha);

				}


				function parseString(data){

					if(defaults.htmlContent == 'true'){
						content_data = data.html().trim();
					}else{
						content_data = data.text().trim();
					}

					if(defaults.escape == 'true'){
						content_data = escape(content_data);
					}



					return content_data;
				}

			}
        });
    })(jQuery);
