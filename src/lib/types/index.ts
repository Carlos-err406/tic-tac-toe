export enum WinType {
	ROW_1 = 1,
	ROW_2 = 2,
	ROW_3 = 3,
	COL_1 = 4,
	COL_2 = 5,
	COL_3 = 6,
	DIAG_1 = 7,
	DIAG_2 = 8
}
export type PlayerType = 'X' | 'O';
export type CellType = PlayerType | null;
export type ThreeCells = [CellType, CellType, CellType];
export type WinCheck = { cells: ThreeCells; winType: WinType };

export type FieldType = [
	CellType,
	CellType,
	CellType,
	CellType,
	CellType,
	CellType,
	CellType,
	CellType,
	CellType
];

export type ConfettiTrigger = {
	clear: () => void;
	triggerCrossConfetti: () => void;
	triggerCircleConfetti: () => void;
	triggerTieConfetti: () => void;
};
