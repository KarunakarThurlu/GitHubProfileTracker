
const prepareLineChartData = (repos) => {

}

const prepareColumnChartData = (repos) => {
    let languageCounts = {};
    let drilldownData = {};
    repos.forEach(repo => {
        const language = repo.language || 'Unknown';
        const repoName = repo.name;

        // Count repositories by language
        if (!languageCounts[language]) {
            languageCounts[language] = 0;
            drilldownData[language] = [];
        }
        languageCounts[language]++;

        // Prepare drilldown data
        drilldownData[language].push({
            name: repoName,
            y: 1
        });
    });
    const seriesData = Object.keys(languageCounts).map(language => ({
        name: language,
        y: languageCounts[language],
        drilldown: language
    }));

    const drilldownSeries = Object.keys(drilldownData).map(language => ({
        id: language,
        name: language,
        data: drilldownData[language]
    }));
    return {seriesData,drilldownSeries}
}

export { prepareLineChartData, prepareColumnChartData }