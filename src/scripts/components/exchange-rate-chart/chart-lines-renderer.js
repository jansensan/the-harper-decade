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
    function render(svg, chartWidth, chartHeight) {
      // TODO: make the 0.25 ratio a param?

      // clear
      svg.selectAll('*').remove();

      // set dimensions
      svg
        .attr('width', chartWidth)
        .attr('height', chartHeight);

      // add 1:1 line
      var oneOneRatioY = chartHeight * 0.25;
      var baseAlpha = 0.5, appliedAlpha = baseAlpha;

      svg
        .append('rect')
        .attr('x', 0)
        .attr('y', oneOneRatioY)
        .attr('width', chartWidth)
        .attr('height', 1)
        .style('fill-opacity', appliedAlpha);

      // build data for lines below
      var i = 0, numLoops = 10, linesData = [];
      var size = Math.floor((chartHeight * 0.75) * 0.1);
      for(i; i < numLoops; i++) {
        appliedAlpha *= 0.75;
        linesData.push({
          y: oneOneRatioY + ((i + 1) * size),
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
      numLoops = 5;
      appliedAlpha = baseAlpha;
      linesData = [];
      for(i; i < numLoops; i++) {
        appliedAlpha *= 0.75;
        linesData.push({
          y: oneOneRatioY - ((i + 1) * size),
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