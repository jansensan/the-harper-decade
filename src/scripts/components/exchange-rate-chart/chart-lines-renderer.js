(function ChartLinesRendererModule() {

  'use strict';

  angular
    .module('harperdecade.components.ChartLinesRenderer', [])
    .factory('chartLinesRenderer', ChartLinesRenderer);

  function ChartLinesRenderer() {
    var _renderer = {
      render: render
    };
    return _renderer;

    // method definitions
    function render(svg, chartWidth, chartHeight, parityY) {
      // clear
      svg.selectAll('*').remove();

      // set dimensions
      svg
        .attr('width', chartWidth)
        .attr('height', chartHeight);

      // shared variables
      var baseAlpha = 0.5, appliedAlpha = baseAlpha;
      var parityLineY = chartHeight - parityY;
      var size = Math.floor(parityY * 0.1);
      var lineY;

      // add 1:1 line
      svg
        .append('rect')
        .attr('x', 0)
        .attr('y', parityLineY)
        .attr('width', chartWidth)
        .attr('height', 1)
        .style('fill-opacity', appliedAlpha);

      // build data for lines below
      var i = 0, numLoops = 10, linesData = [];
      for(i; i < numLoops; i++) {
        appliedAlpha *= 0.75;
        lineY = parityLineY + ((i + 1) * size);
        linesData.push({
          y: lineY,
          alpha: appliedAlpha
        });
      }

      // draw lines below
      _.forEach(linesData, function drawLineBelow(n) {
        svg
          .append('rect')
          .attr('x', 0)
          .attr('y', n.y)
          .attr('width', chartWidth)
          .attr('height', 1)
          .style('fill-opacity', n.alpha);
      });

      // build data for lines above
      i = 0;
      numLoops = 1;
      appliedAlpha = baseAlpha;
      linesData = [];
      for(i; i < numLoops; i++) {
        appliedAlpha *= 0.75;
        lineY = parityLineY - ((i + 1) * size)
        linesData.push({
          y: lineY,
          alpha: appliedAlpha
        });
      }

      // draw lines below
      _.forEach(linesData, function drawLineAbove(n) {
        svg
          .append('rect')
          .attr('x', 0)
          .attr('y', n.y)
          .attr('width', chartWidth)
          .attr('height', 1)
          .style('fill-opacity', n.alpha);
      });
    }
  }



})();