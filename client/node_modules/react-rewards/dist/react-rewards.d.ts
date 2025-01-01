declare type ConfettiConfig = {
    lifetime?: number;
    angle?: number;
    decay?: number;
    spread?: number;
    startVelocity?: number;
    elementCount?: number;
    elementSize?: number;
    zIndex?: number;
    position?: string;
    colors?: string[];
    onAnimationComplete?: () => void;
};

declare type EmojiConfig = {
    lifetime?: number;
    angle?: number;
    decay?: number;
    spread?: number;
    startVelocity?: number;
    elementCount?: number;
    elementSize?: number;
    zIndex?: number;
    position?: string;
    emoji?: string[];
    onAnimationComplete?: () => void;
};

declare type BalloonsConfig = {
    lifetime?: number;
    angle?: number;
    decay?: number;
    spread?: number;
    startVelocity?: number;
    elementCount?: number;
    elementSize?: number;
    zIndex?: number;
    position?: string;
    colors?: string[];
    onAnimationComplete?: () => void;
};

interface RewardConfigs {
    confetti: ConfettiConfig;
    emoji: EmojiConfig;
    balloons: BalloonsConfig;
}
declare type RewardType = keyof RewardConfigs;
declare type RewardFunction = {
    reward: () => void;
    isAnimating: boolean;
};
declare type UseRewardType = <T extends RewardType>(id: string, type: T, config?: RewardConfigs[T]) => RewardFunction;

declare const useReward: UseRewardType;

declare const confetti: (root: Element, internalAnimatingCallback: () => void, config?: ConfettiConfig | undefined) => void;

declare const balloons: (root: Element, internalAnimatingCallback: () => void, config?: BalloonsConfig | undefined) => void;

declare const emoji: (root: Element, internalAnimatingCallback: () => void, config?: EmojiConfig | undefined) => void;

export { balloons, confetti, emoji, useReward };
