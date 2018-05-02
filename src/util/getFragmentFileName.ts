export const getFragmentFileName = (req: any) =>
    `${req.params.token}_${req.params.fragmentNumber}_${req.params.frameType}`;
